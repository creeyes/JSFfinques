/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Rent from './pages/Rent'
import Buy from './pages/Buy'
import Location from './pages/Location'
import Blog from './pages/Blog'
import BlogPostDetail from './pages/BlogPostDetail'
import PropertyDetail from './pages/PropertyDetail'
import Privacidad from './pages/Privacidad'
import AvisoLegal from './pages/AvisoLegal'
import Cookies from './pages/Cookies'

// Admin
import AdminLogin from './pages/admin/AdminLogin'
import AdminLayout from './pages/admin/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminProperties from './pages/admin/AdminProperties'
import AdminPropertyForm from './pages/admin/AdminPropertyForm'
import AdminBlog from './pages/admin/AdminBlog'
import AdminBlogForm from './pages/admin/AdminBlogForm'
import AdminAuthors from './pages/admin/AdminAuthors'
import AdminMessages from './pages/admin/AdminMessages'

function PublicSite() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/alquiler" element={<Rent />} />
          <Route path="/compra" element={<Buy />} />
          <Route path="/ubicacion" element={<Location />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPostDetail />} />
          <Route path="/propiedad/:id" element={<PropertyDetail />} />
          <Route path="/privacidad" element={<Privacidad />} />
          <Route path="/aviso-legal" element={<AvisoLegal />} />
          <Route path="/cookies" element={<Cookies />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}

function AdminSite() {
  return (
    <Routes>
      <Route path="login" element={<AdminLogin />} />
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="propiedades" element={<AdminProperties />} />
        <Route path="propiedades/nueva" element={<AdminPropertyForm />} />
        <Route path="propiedades/:id/editar" element={<AdminPropertyForm />} />
        <Route path="blog" element={<AdminBlog />} />
        <Route path="blog/nuevo" element={<AdminBlogForm />} />
        <Route path="blog/:id/editar" element={<AdminBlogForm />} />
        <Route path="autores" element={<AdminAuthors />} />
        <Route path="mensajes" element={<AdminMessages />} />
      </Route>
    </Routes>
  )
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/*" element={<AdminSite />} />
        <Route path="/*" element={<PublicSite />} />
      </Routes>
    </Router>
  )
}
