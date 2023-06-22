import Header from '../../components/Header/Header';
import ProjectList from '../../components/ProjectList/ProjectList';
import Footer from '../../components/Footer/Footer';
import "./ProjectsPage.scss"


export default function ProjectsPage() {

    return (
        <div className='project-page'>
            <Header />
            <ProjectList />
            <Footer />
        </div>
    );
}




