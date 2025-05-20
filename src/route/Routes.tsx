import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import Layout from "../components/Layout";
import Login from "../components/Login";
import OtpVerify from "../components/OtpVerify";
import GeneralSettings from "../components/Settings/GeneralSetting/GeneralSettings";
import SocialMediaSettings from "../components/Settings/SocialMediaSetting/SocialMediaSettings";
import EmailSettings from "../components/Settings/EmailSetting/EmailSettings";
import ErrorSettings from "../components/Settings/ErrorSettings/ErrorSettings";
import ViewProfile from "../components/Profile/ViewProfile/ViewProfile";
import EditProfile from "../components/Profile/EditProfle/EditProfile";
import TwoFacAuth from "../components/TwoFacAuth";
import UserList from "../components/Users/UserList/UserList";
import EmailTemplates from "../components/EmailTemplates/EmailTemplates";
import AddEmailTemplate from "../components/EmailTemplates/Components/AddEmailTemplate";
import Faq from "../components/Content/Faq/Faq";
import AddFaq from "../components/Content/Faq/AddFaq";
import Role from "../components/Role/Role";
import AddRole from "../components/Role/AddRole";
import FaqCategory from "../components/Content/Faq/FaqCategory/FaqCategory";
import Language from "../components/Master/Language/Language";
import Country from "../components/Master/Country/Country";
import Support from "../components/Support/Support";
import Blogs from "../components/Content/Blogs/Blogs";
import BlogCategory from "../components/Content/Blogs/BlogCategory/BlogCategory";
import AddBlog from "../components/Content/Blogs/AddBlog";
import TicketDetails from "../components/Support/TicketDetails";
// import JobPostForm from "../components/Content/Jobs/JobsPost";
// import Jobs from "../components/Content/Jobs/Jobs";
import JobTable from "../components/Content/Jobs/JobTable";
import JobPostingForm from "../components/Content/Jobs/JobPostingForm";
import NewsTable from "../components/Content/News/NewsTable";
import ViewNews from "../components/Content/News/ViewNews";
import EditNews from "../components/Content/News/EditNews";
import AddNews from "../components/Content/News/AddNews";
import ViewJob from "../components/Content/Jobs/ViewJob";
import HeroTable from "../components/Content/Hero/HeroTable";
import EthosTable from "../components/Content/Ethos/EthosTable";
import ServiceCategoryTable from "../components/Content/Services/ServiceCategoryTable";
import ServiceTable from "../components/Content/Services/ServiceTable";
import Dashboard from "../components/dashboard/Dashboard";
import TestimonialTable from "../components/Content/Testimonial/TestimonialTable";
import WhyChooseUsTable from "../components/Content/WhyChooseUs/WhyChooseUsTable";
import StatisticsTable from "../components/Content/Statistics/StatisticsTable";


const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/authentication" element={<TwoFacAuth />} />
        <Route path="/verify-otp" element={<OtpVerify />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route path="/profile" element={<ViewProfile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/support" element={<Support />} />
          <Route path="/ticketdetails/:id" element={<TicketDetails />} />
          <Route path="/language" element={<Language />} />
          <Route path="/country" element={<Country />} />
          <Route path="/role" element={<Role />} />
          <Route path="/addrole" element={<AddRole />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/bloglist" element={<Blogs />} />
          <Route path="/blogcategory" element={<BlogCategory />} />
          <Route path="/newsandevents" element={<NewsTable />} />
          <Route path="/news/edit/:id" element={<EditNews />} />
          <Route path="/news/view/:id" element={<ViewNews />} />
          <Route path="/news/add" element={<AddNews />} />      
          <Route path="/addblog" element={<AddBlog />} />
          <Route path="/addblog/edit/:id" element={<AddBlog />} />
          <Route path="/email-template" element={<EmailTemplates />} />
          <Route path="/addemailtemplate" element={<AddEmailTemplate />} />
          <Route path="/userslist" element={<UserList />} />
          <Route path="/faqlist" element={<Faq />} />
          <Route path="/faqcategory" element={<FaqCategory />} />
          <Route path="/addfaq" element={<AddFaq />} />
          <Route path="/generalsetting" element={<GeneralSettings />} />
          <Route path="/socialmedia" element={<SocialMediaSettings />} />
          <Route path="/labels" element={<ErrorSettings />} />
          <Route path="/emailnotifications" element={<EmailSettings />} />
          <Route path="/ethos" element={<EthosTable />} />
          <Route path="/servicecategory" element={<ServiceCategoryTable />} />
          <Route path="/services" element={<ServiceTable />} />
          <Route path="/services" element={<ServiceTable />} />
          <Route path="/testimonial" element={<TestimonialTable />} />
          <Route path="/whychooseus" element={<WhyChooseUsTable />}/>
          <Route path="/statistics" element={<StatisticsTable />} />
          {/* <Route path="/jobpost" element={<JobPostForm />} /> */}
          <Route path="/jobs/:id" element={<ViewJob />} />
          <Route path="/jobList" element={<JobTable />} />
          <Route path="/jobPost" element={<JobPostingForm />} />
          <Route path="/hero" element={<HeroTable />} />
          <Route path="/herosection" element={<HeroTable />} />
          <Route path="/jobPost/edit/:id" element={<JobPostingForm />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
