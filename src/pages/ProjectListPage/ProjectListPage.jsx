import Header from '../../components/Header/Header';
import ProjectList from '../../components/ProjectList/ProjectList';
import Footer from '../../components/Footer/Footer';
import "./ProjectListPage.scss"


export default function ProjectListPage() {

    return (
        <section className='projectlistpage'>
            <Header />
            <ProjectList />
            <Footer />
        </section>
    );
}




