import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth, db, storage } from '../firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { collection, getDocs, doc, setDoc, deleteDoc, addDoc, serverTimestamp, query, orderBy } from 'firebase/firestore'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { Plus, Trash2, LogOut, UploadCloud } from 'lucide-react'
import '../App.css'

const availableIcons = ["Terminal", "Cpu", "Code2", "Globe", "BookOpen"]

function AdminDashboard() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [projects, setProjects] = useState([])
  const [certificates, setCertificates] = useState([])
  const [aboutText, setAboutText] = useState("")
  const [saveLoading, setSaveLoading] = useState(false)
  const [statusMessage, setStatusMessage] = useState("")

  // Form states for new project
  const [newTitle, setNewTitle] = useState("")
  const [newDesc, setNewDesc] = useState("")
  const [newDetails, setNewDetails] = useState("")
  const [newTech, setNewTech] = useState("")
  const [newIcon, setNewIcon] = useState("Terminal")
  const [newLink, setNewLink] = useState("")
  const [projectMode, setProjectMode] = useState("manual") // "manual" or "bulk"
  const [bulkJson, setBulkJson] = useState("")


  // Form states for new certificate
  const [newCertTitle, setNewCertTitle] = useState("")
  const [newCertIssuer, setNewCertIssuer] = useState("")
  const [newCertDesc, setNewCertDesc] = useState("")
  const [newCertDetails, setNewCertDetails] = useState("")
  const [newCertLink, setNewCertLink] = useState("")
  const [newCertImage, setNewCertImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploading, setUploading] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        if (currentUser.email === 'ryanazis24@gmail.com') {
          setUser(currentUser)
          setLoading(false)
        } else {
          signOut(auth)
          navigate('/secret-admin')
        }
      } else {
        navigate('/secret-admin')
      }
    })
    return () => unsubscribe()
  }, [navigate])

  useEffect(() => {
    if (user) {
      fetchData()
    }
  }, [user])

  const fetchData = async () => {
    try {
      // Fetch projects
      const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'))
      const querySnapshot = await getDocs(q)
      const fetchedProjects = []
      querySnapshot.forEach((docSnapshot) => {
        fetchedProjects.push({ id: docSnapshot.id, ...docSnapshot.data() })
      })
      setProjects(fetchedProjects)

      // Fetch certificates
      const certQ = query(collection(db, 'certificates'), orderBy('createdAt', 'desc'))
      const certSnapshot = await getDocs(certQ)
      const fetchedCerts = []
      certSnapshot.forEach((docSnapshot) => {
        fetchedCerts.push({ id: docSnapshot.id, ...docSnapshot.data() })
      })
      setCertificates(fetchedCerts)

      // Fetch about text
      const configSnapshot = await getDocs(collection(db, 'config'))
      configSnapshot.forEach((docSnapshot) => {
        if (docSnapshot.id === 'about') {
          setAboutText(docSnapshot.data().text)
        }
      })
    } catch (error) {
      console.error("Error fetching admin data: ", error)
    }
  }

  const handleLogout = async () => {
    await signOut(auth)
    navigate('/')
  }

  const handleSaveAbout = async (e) => {
    e.preventDefault()
    setSaveLoading(true)
    setStatusMessage("")
    try {
      await setDoc(doc(db, 'config', 'about'), { text: aboutText })
      setStatusMessage("Deskripsi About berhasil diperbarui!")
    } catch (err) {
      console.error(err)
      setStatusMessage("Gagal memperbarui deskripsi.")
    } finally {
      setSaveLoading(false)
    }
  }

  const handleAddProject = async (e) => {
    e.preventDefault()
    setSaveLoading(true)
    setStatusMessage("")
    try {
      await addDoc(collection(db, 'projects'), {
        title: newTitle,
        desc: newDesc,
        details: newDetails,
        tech: newTech,
        icon: newIcon,
        link: newLink || "#",
        createdAt: serverTimestamp()
      })
      setStatusMessage("Project baru berhasil ditambahkan!")
      setNewTitle("")
      setNewDesc("")
      setNewDetails("")
      setNewTech("")
      setNewIcon("Terminal")
      setNewLink("")
      fetchData()
    } catch (err) {
      console.error(err)
      setStatusMessage("Gagal menambahkan project.")
    } finally {
      setSaveLoading(false)
    }
  }

  const handleBulkImport = async (e) => {
    e.preventDefault()
    setSaveLoading(true)
    setStatusMessage("")
    try {
      const parsed = JSON.parse(bulkJson)
      if (!Array.isArray(parsed)) {
        throw new Error("Format JSON harus berupa array []")
      }
      for (const proj of parsed) {
        if (!proj.title || !proj.desc || !proj.details) {
          throw new Error("Setiap project harus memiliki field title, desc, dan details.")
        }
      }
      for (const proj of parsed) {
        await addDoc(collection(db, 'projects'), {
          title: proj.title,
          desc: proj.desc,
          details: proj.details,
          tech: proj.tech || "",
          icon: proj.icon || "Terminal",
          link: proj.link || "#",
          createdAt: serverTimestamp()
        })
      }
      setStatusMessage(`Berhasil mengimpor ${parsed.length} project!`)
      setBulkJson("")
      setProjectMode("manual")
      fetchData()
    } catch (err) {
      console.error(err)
      setStatusMessage("Gagal mengimpor: " + err.message)
    } finally {
      setSaveLoading(false)
    }
  }

  const handleDeleteProject = async (projectId) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus project ini?")) {
      setStatusMessage("")
      try {
        await deleteDoc(doc(db, 'projects', projectId))
        setStatusMessage("Project berhasil dihapus!")
        fetchData()
      } catch (err) {
        console.error(err)
        setStatusMessage("Gagal menghapus project.")
      }
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setNewCertImage(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleAddCertificate = async (e) => {
    e.preventDefault()
    setSaveLoading(true)
    setStatusMessage("")
    try {
      let imageUrl = ""

      // Upload image to Firebase Storage if provided
      if (newCertImage) {
        setUploading(true)
        const storageRef = ref(storage, `certificates/${Date.now()}_${newCertImage.name}`)
        const uploadTask = uploadBytesResumable(storageRef, newCertImage)

        await new Promise((resolve, reject) => {
          uploadTask.on('state_changed',
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              setUploadProgress(Math.round(progress))
            },
            (error) => reject(error),
            async () => {
              imageUrl = await getDownloadURL(uploadTask.snapshot.ref)
              resolve()
            }
          )
        })
        setUploading(false)
        setUploadProgress(0)
      }

      await addDoc(collection(db, 'certificates'), {
        title: newCertTitle,
        issuer: newCertIssuer,
        desc: newCertDesc,
        details: newCertDetails,
        link: newCertLink || "#",
        imageUrl: imageUrl,
        createdAt: serverTimestamp()
      })
      setStatusMessage("Sertifikat baru berhasil ditambahkan!")
      setNewCertTitle("")
      setNewCertIssuer("")
      setNewCertDesc("")
      setNewCertDetails("")
      setNewCertLink("")
      setNewCertImage(null)
      setImagePreview(null)
      fetchData()
    } catch (err) {
      console.error(err)
      setStatusMessage("Gagal menambahkan sertifikat: " + err.message)
      setUploading(false)
    } finally {
      setSaveLoading(false)
    }
  }

  const handleDeleteCertificate = async (certId) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus sertifikat ini?")) {
      setStatusMessage("")
      try {
        await deleteDoc(doc(db, 'certificates', certId))
        setStatusMessage("Sertifikat berhasil dihapus!")
        fetchData()
      } catch (err) {
        console.error(err)
        setStatusMessage("Gagal menghapus sertifikat.")
      }
    }
  }

  if (loading) {
    return (
      <div className="app-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <div className="bg-gradients"></div>
        <p style={{ zIndex: 2 }}>Loading authentication...</p>
      </div>
    )
  }

  return (
    <div className="app-container" style={{ padding: '40px 20px', minHeight: '100vh' }}>
      <div className="bg-gradients"></div>
      <div className="container" style={{ zIndex: 2, position: 'relative' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <div>
            <h1 className="text-gradient" style={{ fontSize: '2rem', margin: 0 }}>Admin CMS</h1>
            <p style={{ color: 'var(--text-secondary)', margin: '4px 0 0' }}>Hi, {user.email}</p>
          </div>
          <button onClick={handleLogout} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <LogOut size={16} /> Logout
          </button>
        </header>

        {statusMessage && (
          <div style={{ background: 'rgba(22, 163, 74, 0.05)', border: '1px solid rgba(22, 163, 74, 0.15)', padding: '16px', borderRadius: '12px', marginBottom: '24px', color: '#16a34a', fontWeight: '500' }}>
            {statusMessage}
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          {/* Section: Edit About */}
          <section className="glass-panel" style={{ padding: '32px' }}>
            <h2 style={{ marginBottom: '20px' }}>Edit About Me</h2>
            <form onSubmit={handleSaveAbout}>
              <textarea
                value={aboutText}
                onChange={(e) => setAboutText(e.target.value)}
                rows={4}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid rgba(15, 23, 42, 0.1)',
                  background: 'rgba(15, 23, 42, 0.02)',
                  color: 'var(--text-primary)',
                  outline: 'none',
                  fontSize: '1rem',
                  resize: 'vertical',
                  marginBottom: '16px'
                }}
              />
              <button type="submit" disabled={saveLoading} className="btn btn-primary">
                Simpan Perubahan
              </button>
            </form>
          </section>

          {/* Section: Projects CMS */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', alignItems: 'start' }}>
            
            {/* Form: Add New Project */}
            <section className="glass-panel" style={{ padding: '32px' }}>
              <h2 style={{ marginBottom: '12px' }}>Tambah Project Baru</h2>
              
              {/* Tab Switcher */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '12px' }}>
                <button 
                  type="button"
                  onClick={() => setProjectMode("manual")}
                  style={{
                    background: projectMode === "manual" ? "rgba(99, 102, 241, 0.15)" : "transparent",
                    color: projectMode === "manual" ? "#6366f1" : "var(--text-secondary)",
                    border: 'none',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '0.85rem',
                    transition: 'all 0.2s'
                  }}
                >
                  Form Manual
                </button>
                <button 
                  type="button"
                  onClick={() => setProjectMode("bulk")}
                  style={{
                    background: projectMode === "bulk" ? "rgba(99, 102, 241, 0.15)" : "transparent",
                    color: projectMode === "bulk" ? "#6366f1" : "var(--text-secondary)",
                    border: 'none',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '0.85rem',
                    transition: 'all 0.2s'
                  }}
                >
                  Bulk Import (JSON)
                </button>
              </div>

              {projectMode === "manual" ? (
                <form onSubmit={handleAddProject}>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', marginBottom: '6px', color: 'var(--text-secondary)' }}>Judul Project</label>
                    <input
                      type="text"
                      required
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '8px',
                        border: '1px solid rgba(15, 23, 42, 0.1)',
                        background: 'rgba(15, 23, 42, 0.02)',
                        color: 'var(--text-primary)',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', marginBottom: '6px', color: 'var(--text-secondary)' }}>Deskripsi Singkat Project</label>
                    <input
                      type="text"
                      required
                      placeholder="Deskripsi singkat yang tampil di halaman depan..."
                      value={newDesc}
                      onChange={(e) => setNewDesc(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '8px',
                        border: '1px solid rgba(15, 23, 42, 0.1)',
                        background: 'rgba(15, 23, 42, 0.02)',
                        color: 'var(--text-primary)',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', marginBottom: '6px', color: 'var(--text-secondary)' }}>Detail Penjelasan Lengkap (Pop-up)</label>
                    <textarea
                      required
                      placeholder="Tulis penjelasan mendalam mengenai project ini..."
                      value={newDetails}
                      onChange={(e) => setNewDetails(e.target.value)}
                      rows={4}
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '8px',
                        border: '1px solid rgba(15, 23, 42, 0.1)',
                        background: 'rgba(15, 23, 42, 0.02)',
                        color: 'var(--text-primary)',
                        outline: 'none',
                        resize: 'vertical'
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', marginBottom: '6px', color: 'var(--text-secondary)' }}>Tech Stack (pisahkan dengan koma)</label>
                    <input
                      type="text"
                      required
                      placeholder="React, CSS, Vite"
                      value={newTech}
                      onChange={(e) => setNewTech(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '8px',
                        border: '1px solid rgba(15, 23, 42, 0.1)',
                        background: 'rgba(15, 23, 42, 0.02)',
                        color: 'var(--text-primary)',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', marginBottom: '6px', color: 'var(--text-secondary)' }}>Link Project / Demo Live (Opsional)</label>
                    <input
                      type="text"
                      placeholder="https://my-live-project.com"
                      value={newLink}
                      onChange={(e) => setNewLink(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '8px',
                        border: '1px solid rgba(15, 23, 42, 0.1)',
                        background: 'rgba(15, 23, 42, 0.02)',
                        color: 'var(--text-primary)',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', marginBottom: '6px', color: 'var(--text-secondary)' }}>Ikon</label>
                    <select
                      value={newIcon}
                      onChange={(e) => setNewIcon(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '8px',
                        border: '1px solid rgba(15, 23, 42, 0.1)',
                        background: 'rgba(15, 23, 42, 0.02)',
                        color: 'var(--text-primary)',
                        outline: 'none',
                      }}
                    >
                      {availableIcons.map(icon => (
                        <option key={icon} value={icon} style={{ background: 'white', color: 'var(--text-primary)' }}>{icon}</option>
                      ))}
                    </select>
                  </div>

                  <button type="submit" disabled={saveLoading} className="btn btn-primary" style={{ width: '100%' }}>
                    <Plus size={16} /> Tambah Project
                  </button>
                </form>
              ) : (
                <form onSubmit={handleBulkImport}>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                      Tempel Array JSON Project di sini:
                    </label>
                    <textarea
                      required
                      placeholder={`[\n  {\n    "title": "E-Commerce Cafe",\n    "desc": "Short description of cafe project",\n    "details": "Full description with features...",\n    "tech": "React, Tailwind, Express",\n    "icon": "Globe",\n    "link": "https://..."\n  }\n]`}
                      value={bulkJson}
                      onChange={(e) => setBulkJson(e.target.value)}
                      rows={12}
                      style={{
                        width: '100%',
                        padding: '12px',
                        borderRadius: '8px',
                        border: '1px solid rgba(15, 23, 42, 0.1)',
                        background: 'rgba(15, 23, 42, 0.02)',
                        color: 'var(--text-primary)',
                        outline: 'none',
                        fontFamily: 'monospace',
                        fontSize: '0.85rem',
                        resize: 'vertical',
                        lineHeight: '1.4'
                      }}
                    />
                  </div>
                  <button type="submit" disabled={saveLoading} className="btn btn-primary" style={{ width: '100%' }}>
                    <UploadCloud size={16} /> Import Semua Project Sekarang
                  </button>
                </form>
              )}
            </section>

            {/* List: Existing Projects */}
            <section className="glass-panel" style={{ padding: '32px', maxHeight: '720px', overflowY: 'auto' }}>
              <h2 style={{ marginBottom: '20px' }}>Daftar Project ({projects.length})</h2>
              {projects.length === 0 ? (
                <p style={{ color: 'var(--text-secondary)' }}>Belum ada project.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {projects.map((project) => (
                    <div 
                      key={project.id} 
                      style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        padding: '16px', 
                        borderRadius: '8px', 
                        background: 'rgba(15, 23, 42, 0.01)',
                        border: '1px solid rgba(15, 23, 42, 0.04)'
                      }}
                    >
                      <div>
                        <h4 style={{ margin: '0 0 4px 0' }}>{project.title}</h4>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                          {typeof project.tech === 'string' ? project.tech : (project.tech || []).join(', ')}
                        </span>
                      </div>
                      <button 
                        onClick={() => handleDeleteProject(project.id)}
                        className="btn btn-outline" 
                        style={{ padding: '8px', color: '#ff6b6b', borderColor: 'rgba(255,107,107,0.2)' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </section>

          </div>

          {/* Section: Certificates CMS */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', alignItems: 'start' }}>
            
            {/* Form: Add New Certificate */}
            <section className="glass-panel" style={{ padding: '32px' }}>
              <h2 style={{ marginBottom: '20px' }}>Tambah Sertifikat Baru</h2>
              <form onSubmit={handleAddCertificate}>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '6px', color: 'var(--text-secondary)' }}>Nama Sertifikat</label>
                  <input
                    type="text"
                    required
                    value={newCertTitle}
                    onChange={(e) => setNewCertTitle(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '8px',
                      border: '1px solid rgba(15, 23, 42, 0.1)',
                      background: 'rgba(15, 23, 42, 0.02)',
                      color: 'var(--text-primary)',
                      outline: 'none',
                    }}
                  />
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '6px', color: 'var(--text-secondary)' }}>Penerbit / Institusi (Issuer)</label>
                  <input
                    type="text"
                    required
                    placeholder="freeCodeCamp, Coursera, dll."
                    value={newCertIssuer}
                    onChange={(e) => setNewCertIssuer(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '8px',
                      border: '1px solid rgba(15, 23, 42, 0.1)',
                      background: 'rgba(15, 23, 42, 0.02)',
                      color: 'var(--text-primary)',
                      outline: 'none',
                    }}
                  />
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '6px', color: 'var(--text-secondary)' }}>Deskripsi Singkat Sertifikat</label>
                  <textarea
                    required
                    value={newCertDesc}
                    onChange={(e) => setNewCertDesc(e.target.value)}
                    rows={3}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '8px',
                      border: '1px solid rgba(15, 23, 42, 0.1)',
                      background: 'rgba(15, 23, 42, 0.02)',
                      color: 'var(--text-primary)',
                      outline: 'none',
                      resize: 'none'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '6px', color: 'var(--text-secondary)' }}>Detail Penjelasan Lengkap (Pop-up)</label>
                  <textarea
                    required
                    placeholder="Tulis penjelasan mendalam mengenai sertifikat ini..."
                    value={newCertDetails}
                    onChange={(e) => setNewCertDetails(e.target.value)}
                    rows={4}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '8px',
                      border: '1px solid rgba(15, 23, 42, 0.1)',
                      background: 'rgba(15, 23, 42, 0.02)',
                      color: 'var(--text-primary)',
                      outline: 'none',
                      resize: 'vertical'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', marginBottom: '6px', color: 'var(--text-secondary)' }}>Link Verifikasi (Opsional)</label>
                  <input
                    type="text"
                    placeholder="https://credential-verification-link.com"
                    value={newCertLink}
                    onChange={(e) => setNewCertLink(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '8px',
                      border: '1px solid rgba(15, 23, 42, 0.1)',
                      background: 'rgba(15, 23, 42, 0.02)',
                      color: 'var(--text-primary)',
                      outline: 'none',
                    }}
                  />
                </div>

                {/* Image Upload Field */}
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', marginBottom: '6px', color: 'var(--text-secondary)' }}>
                    Foto / Gambar Sertifikat (Opsional)
                  </label>

                  <label
                    htmlFor="cert-image-upload"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      width: '100%',
                      minHeight: imagePreview ? 'auto' : '120px',
                      borderRadius: '12px',
                      border: '2px dashed rgba(79, 70, 229, 0.3)',
                      background: 'rgba(79, 70, 229, 0.03)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      overflow: 'hidden',
                      padding: imagePreview ? '0' : '20px',
                    }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(79,70,229,0.7)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(79,70,229,0.3)'}
                  >
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview sertifikat"
                        style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', display: 'block', borderRadius: '10px' }}
                      />
                    ) : (
                      <>
                        <UploadCloud size={32} style={{ color: 'var(--accent-primary)', opacity: 0.7 }} />
                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', textAlign: 'center' }}>
                          Klik untuk memilih gambar<br/>
                          <span style={{ fontSize: '0.75rem', opacity: 0.6 }}>PNG, JPG, WEBP (maks. 5MB)</span>
                        </span>
                      </>
                    )}
                  </label>

                  <input
                    id="cert-image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                  />

                  {imagePreview && (
                    <button
                      type="button"
                      onClick={() => { setNewCertImage(null); setImagePreview(null) }}
                      style={{
                        marginTop: '8px',
                        background: 'transparent',
                        border: '1px solid rgba(255,107,107,0.4)',
                        color: '#ff6b6b',
                        borderRadius: '6px',
                        padding: '4px 12px',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        width: '100%',
                      }}
                    >
                      ✕ Hapus Gambar
                    </button>
                  )}

                  {uploading && (
                    <div style={{ marginTop: '10px' }}>
                      <div style={{ height: '6px', borderRadius: '999px', background: 'rgba(79,70,229,0.1)', overflow: 'hidden' }}>
                        <div style={{
                          height: '100%',
                          width: `${uploadProgress}%`,
                          background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))',
                          borderRadius: '999px',
                          transition: 'width 0.3s ease'
                        }} />
                      </div>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px', textAlign: 'center' }}>
                        Mengupload gambar... {uploadProgress}%
                      </p>
                    </div>
                  )}
                </div>

                <button type="submit" disabled={saveLoading || uploading} className="btn btn-primary" style={{ width: '100%' }}>
                  {uploading ? `Mengupload... ${uploadProgress}%` : saveLoading ? 'Menyimpan...' : <><Plus size={16} /> Tambah Sertifikat</>}
                </button>
              </form>
            </section>


            {/* List: Existing Certificates */}
            <section className="glass-panel" style={{ padding: '32px', maxHeight: '720px', overflowY: 'auto' }}>
              <h2 style={{ marginBottom: '20px' }}>Daftar Sertifikat ({certificates.length})</h2>
              {certificates.length === 0 ? (
                <p style={{ color: 'var(--text-secondary)' }}>Belum ada sertifikat.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {certificates.map((cert) => (
                    <div 
                      key={cert.id} 
                      style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        padding: '16px', 
                        borderRadius: '8px', 
                        background: 'rgba(15, 23, 42, 0.01)',
                        border: '1px solid rgba(15, 23, 42, 0.04)'
                      }}
                    >
                      <div>
                        <h4 style={{ margin: '0 0 4px 0' }}>{cert.title}</h4>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                          {cert.issuer}
                        </span>
                      </div>
                      <button 
                        onClick={() => handleDeleteCertificate(cert.id)}
                        className="btn btn-outline" 
                        style={{ padding: '8px', color: '#ff6b6b', borderColor: 'rgba(255,107,107,0.2)' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </section>

          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
