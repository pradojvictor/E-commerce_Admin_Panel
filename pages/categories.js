import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Categories() {
    const [name, setName] = useState('');
    const [categories, setCategories] = useState([]);
    const [parentCategory, setParentCategory] = useState('');

    useEffect(() => {
        fetchCategories();
    }, [])

    function fetchCategories() {
        axios.get('/api/categories').then(result => {
            setCategories(result.data);
        });
    }

    async function saveCategory(ev) {
        ev.preventDefault();
        await axios.post('/api/categories', { name, parentCategory });
        setName('')
        fetchCategories();
    }
    return (
        <Layout>
            <h1>Categories</h1>
            <label>New Category name</label>
            <form onSubmit={saveCategory} className="flex gap-1">
                <input
                    className="mb-0"
                    type="text"
                    placeholder={'Category name'}
                    onChange={ev => setName(ev.target.value)}
                    value={name}
                />
                <select
                    className="mb-0"
                    onChange={ev => setParentCategory(ev.target.value)}
                    value={parentCategory}>
                    <option value={""}>No parent category</option>
                    {categories.length > 0 && categories.map(category => (
                        // eslint-disable-next-line react/jsx-key
                        <option value={category._id}>{category.name}</option>
                    ))}
                </select>
                <button type="submit" className="btn-primary">Save</button>
            </form>
            <table className="basic mt-4">
                <thead>
                    <tr>
                        <td>Category name</td>
                        <td>Parent category</td>
                    </tr>
                </thead>
                <tbody>
                    {categories.length > 0 && categories.map(category => (
                        // eslint-disable-next-line react/jsx-key
                        <tr>
                            <td>{category.name}</td>
                            <td>{category?.parent?.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Layout>
    )
}

//3:26:38