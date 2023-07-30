import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './Components/Signup';
import Signin from './Components/Signin';
import Appbar from './Components/Appbar';
import Add_UpdateCourse from './Components/Add_UpdateCourse';
import Menu from './Components/Menu';
import EditCourse from './Components/EditCourse';
import PurchaseCourse from './Components/PurchaseCourse';
import ShowPurchased from './Components/ShowPurchased';
import Landing from './Components/Landing';
import BackToTop from './Features/BackToTop';
import Footer from './Components/Footer';
import './App.css';

import PrivateRoutes from './utils/PrivateRoutes';
import PageNotFound from './Components/PageNotFound';
import Unauthorized from './Components/Unauthorized';


function App() {
    return (
        <div>
            <Router>
                <Appbar />
                <div id="back-to-top-anchor" />
                <Routes>

                    <Route element={<PrivateRoutes />}>
                        {/* should be private */}
                        <Route path='/:role/menu' element={<Menu />} />
                        <Route path='/:role/addcourse' element={<Add_UpdateCourse />} />
                        <Route path='/:role/editcourse/:courseId' element={<EditCourse />} />
                        <Route path='/:role/purchasecourse/:courseId' element={<PurchaseCourse />} />
                        <Route path='/:role/showpurchased' element={<ShowPurchased />} />
                    </Route>

                    {/* should be public */}
                    <Route path='/' element={<Landing />} />
                    <Route path='/:role/signup' element={<Signup />} />
                    <Route path='/:role/signin' element={<Signin />} />

                    <Route path="*" element={<PageNotFound />} />
                    <Route path="/unauthorized" element={<Unauthorized />} />

                </Routes>
            </Router>
            <Footer />
            <BackToTop />
        </div>
    );
}

export default App;