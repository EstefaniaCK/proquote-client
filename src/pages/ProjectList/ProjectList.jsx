import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
export default function ProjectList() {
    const userId = 1;
    const userName = "Estefania";
    const [activeProjects, setActiveProjects] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/projects').then((response) => setActiveProjects(response.data))
    }, [])

    return (
        <div className='projects'>
            <ul className='projects__list'>
                {activeProjects.map((project) => (
                    <Link key={project.id} to={`/projects/${project.id}/items`}>
                        <li className='projects__item'>
                            <h1 className='projects__title'>{project.project_name}</h1>
                        </li></Link>

                ))}
            </ul>

        </div>
    )
}