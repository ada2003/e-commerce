import "./App.css";
import Navbar from "./comp/header/Navbar";
import AutoImageSlider from "./comp/Slider/AutoImageSlider";
import AboutUs from "./comp/Aboutus/AboutUs";
import Footer from "./comp/Footer/Footer";
import ContactForm from "./comp/ContactForm/ContactForm";
import FAQSection from "./comp/FAQ/FAQSection";
import GalleryGrid from "./comp/gallery/GalleryGrid ";
import ProductSection from "./comp/products/ProductSection";
import TestimonialsComponent from "./comp/feedback/TestimonialsComponent";
import EnhancedBlogSlider from "./comp/Blogs/EnhancedBlogSlider";
import { Routes, Route } from 'react-router-dom';
import CartPage from "./comp/header/mycart/CartPage";
function App() {
  return (
    <>
      <Navbar />  {/* Navbar will be shown on all pages */}
      
      <main>
        <Routes>
          {/* Route for the CartPage */}
          <Route path="/my-cart" element={<CartPage />} />
          
          {/* Default route for the landing page */}
          <Route path="/" element={
            <>
              <section id="home">
                <AutoImageSlider />
              </section>
              <section id="about">
                <AboutUs />
              </section>
              <section id="products">
                <ProductSection />
              </section>
              <section id="gallery">
                <GalleryGrid />
              </section>
              <section id="contact">
                <ContactForm />
              </section>
              <section id="Blogs">
                <EnhancedBlogSlider />
              </section>
              <TestimonialsComponent />
              <FAQSection />
            </>
          } />
        </Routes>
      </main>
      
      <Footer />  {/* Footer will be shown on all pages */}
    </>
  );
}

export default App;
