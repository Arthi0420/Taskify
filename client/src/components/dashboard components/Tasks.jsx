import { IoSearchOutline } from "react-icons/io5";
import { FaEdit, FaTrash, FaCheckCircle, FaRegHourglass, FaSpinner } from "react-icons/fa";
import { LuPin } from "react-icons/lu";
import { LuPinOff } from "react-icons/lu";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const Tasks = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tasks, setTasks] = useState([]);
    const [allTasks, setAllTasks] = useState([]);
    const [search, setSearch] = useState('');
    const [sortOption, setSortOption] = useState(localStorage.getItem('sortOption') || 'date');
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editingTitle, setEditingTitle] = useState('');
    const [editingDescription, setEditingDescription] = useState('');
    const [editingStatus, setEditingStatus] = useState('To Do');

    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
    console.log(user)


    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        const storedUserId = localStorage.getItem("userId");
        const storedEmail = localStorage.getItem("email");

        if (storedUserId && storedEmail) {
            setUser({
                uid: storedUserId,
                email: storedEmail,
            });
        } else {
            navigate('/login'); // Redirect to login if user data not found
        }

        fetchTasks();
    }, []);

    const fetchTasks = () => {
        const storedUserId = localStorage.getItem("userId");

        if (!storedUserId) {
            alert('Please login to access the dashboard.');
            navigate('/login');
            return;
        }

        axios.get(`${backendUrl}/api/tasks?userId=${storedUserId}`, { withCredentials: true})
            .then(res => {
                const sortedTasks = sortTasks(res.data, sortOption);
                setTasks(sortedTasks);
                setAllTasks(sortedTasks);
            })
            .catch(error => console.error("Error fetching tasks!", error));
    };

    const handleAdd = async (event) => {
        event.preventDefault();
        if (title.trim() !== '' && description.trim() !== '') {
            const taskData = {
                title,
                description,
                status: 'To Do',
                pinned: false,
                userId: user.uid
            };
            
            await axios.post(`${backendUrl}/api/tasks`, taskData, { withCredentials: true})
                .then(() => {
                    fetchTasks(); // Refresh tasks after adding
                    setTitle('');
                    setDescription('');
                    toast.success('Task added successfully!', { position: "bottom-right", autoClose: 3000 });
                })
                .catch(error => {
                    console.error("Error adding task!", error);
                    toast.error('Task adding failed!', { position: "bottom-right", autoClose: 3000 });
                });
        } else {
            toast.error('Please provide both title and description.', { position: "bottom-right", autoClose: 3000 });
        }
    };

    const handleEdit = (task) => {
        setEditingTaskId(task._id);
        setEditingTitle(task.title);
        setEditingDescription(task.description);
        setEditingStatus(task.status);
    };

    const handleUpdate = async (taskId) => {
        const updatedTaskData = {
            title: editingTitle,
            description: editingDescription,
            status: editingStatus
        };

        await axios.put(`${backendUrl}/api/tasks/${taskId}`, updatedTaskData, { withCredentials: true})
            .then(res => {
                const updatedTasks = tasks.map(task => task._id === taskId ? res.data : task);
                setTasks(sortTasks(updatedTasks, sortOption));
                setAllTasks(sortTasks(allTasks.map(task => task._id === taskId ? res.data : task), sortOption));
                setEditingTaskId(null);
                toast.success('Task updated successfully!', { position: "bottom-right", autoClose: 3000 });
            })
            .catch(error => {
                console.error("Error updating task!", error);
            });
    };

    const handleDelete = (id) => {
        axios.delete(`${backendUrl}/api/tasks/${id}`, { withCredentials: true})
            .then(() => {
                const updatedTasks = tasks.filter(task => task._id !== id);
                setTasks(sortTasks(updatedTasks, sortOption));
                setAllTasks(sortTasks(allTasks.filter(task => task._id !== id), sortOption));
                toast.error('Task deleted successfully!', { position: "bottom-right", autoClose: 3000 });
            })
            .catch(error => console.error("Error deleting task!", error));
    };

    const handlePin = (id, currentPinnedStatus) => {
        axios.put(`${backendUrl}/api/tasks/${id}`, { pinned: !currentPinnedStatus }, { withCredentials: true})
            .then(() => {
                const updatedTasks = tasks.map(task => task._id === id ? { ...task, pinned: !currentPinnedStatus } : task);
                setTasks(sortTasks(updatedTasks, sortOption));
                setAllTasks(sortTasks(allTasks.map(task => task._id === id ? { ...task, pinned: !currentPinnedStatus } : task), sortOption));
                toast.success('Task pin state updated!', { position: "bottom-right", autoClose: 3000 });
            })
            .catch(error => console.error("Error updating pin state!", error));
    };

    // Date Format
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const handleSearch = (e) => {
        const searchValue = e.target.value.toLowerCase();
        setSearch(searchValue);

        if (searchValue === '') {
            setTasks(allTasks);
        } else {
            const filteredTasks = allTasks.filter(task => task.title.toLowerCase().includes(searchValue));
            setTasks(filteredTasks);
        }
    };

    const sortTasks = (taskList, sortBy) => {
        return taskList.sort((a, b) => {
            if (a.pinned !== b.pinned) {
                return a.pinned ? -1 : 1;
            }
            switch (sortBy) {
                case 'title':
                    return a.title.localeCompare(b.title);
                case 'status':
                    return a.status.localeCompare(b.status);
                case 'date':
                    return new Date(b.date) - new Date(a.date);
                default:
                    return 0;
            }
        });
    };

    const handleSortChange = (e) => {
        const selectedOption = e.target.value;
        setSortOption(selectedOption);
        localStorage.setItem('sortOption', selectedOption);
        setTasks(sortTasks([...tasks], selectedOption));
    };

    return (
        <div className="overflow-x-hidden bg-blue-100">
            <div className="px-5">
                <div className="flex flex-col justify-center items-center">
                    <h1 className="md:text-4xl text-2xl font-bold my-4 bg-gradient-to-r shadow-md from-blue-500 to-green-500 bg-clip-text text-transparent">
                        Use this page to create a New Task :)
                    </h1>
                    <form onSubmit={handleAdd} className="shadow-md rounded px-16 py-6 w-full max-w-lg">
                        <input
                            type="text"
                            placeholder="Enter the Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="mt-2 p-2 w-full border border-green-700 rounded outline-blue-400 shadow-md"
                        />
                        <textarea
                            placeholder="Enter the description here..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="mt-4 p-2 w-full border border-green-700 rounded outline-blue-400 shadow-md"
                        />
                        <div className="flex justify-end">
                            <button type="submit" className="p-2 px-4 mt-4 bg-green-600 text-white rounded font-semibold hover:scale-105 transition-transform duration-300">
                                Add Task
                            </button>
                        </div>
                        <ToastContainer />
                    </form>

                    <h1 className="md:text-3xl text-2xl text-[#2e0249] font-bold mt-16">Here is the list of all your Tasks</h1>

                    <div className="flex items-center my-10 gap-5 md:gap-36">
                        <div className="flex items-center gap-2 border border-slate-400 p-2 md:w-[400px] rounded-full shadow-md">
                            <IoSearchOutline />
                            <input
                                placeholder="Search your task here..."
                                className="outline-none bg-blue-100"
                                value={search}
                                onChange={handleSearch}
                            />
                        </div>

                        <select
                            className="md:mt-2 p-1 md:p-2 md:font-semibold border border-slate-400 rounded shadow-md"
                            onChange={handleSortChange}
                        >
                            <option value="title">Sort By Title</option>
                            <option value="status">Sort By Status</option>
                            <option value="date">Sort By Date</option>
                        </select>
                    </div>

                    <div className="grid md:grid-cols-3 gap-10 m-5 w-full">
                        {tasks.map(task => (
                            <div key={task._id} className="border p-2 rounded shadow relative">
                                {editingTaskId === task._id ? (
                                    <div>
                                        <input
                                            type="text"
                                            value={editingTitle}
                                            onChange={(e) => setEditingTitle(e.target.value)}
                                            className="mt-2 p-2 w-full border border-green-700 rounded outline-blue-400 shadow-md"
                                        />
                                        <textarea
                                            value={editingDescription}
                                            onChange={(e) => setEditingDescription(e.target.value)}
                                            className="mt-4 p-2 w-full border border-green-700 rounded outline-blue-400 shadow-md"
                                        />
                                        <select
                                            value={editingStatus}
                                            onChange={(e) => setEditingStatus(e.target.value)}
                                            className="mt-4 p-2 w-full border border-green-700 rounded outline-blue-400 shadow-md"
                                        >
                                            <option>To Do</option>
                                            <option>In Progress</option>
                                            <option>Completed</option>
                                        </select>
                                        <div className="flex justify-end gap-2 mt-4">
                                            <button
                                                onClick={() => handleUpdate(task._id)}
                                                className="p-2 px-4 bg-green-600 text-white rounded font-semibold hover:scale-105 transition-transform duration-300">
                                                Save
                                            </button>
                                            <button
                                                onClick={() => setEditingTaskId(null)}
                                                className="p-2 px-4 bg-red-500 text-white rounded font-semibold hover:scale-105 transition-transform duration-300">
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-bold text-xl">{task.title}</h3>
                                            <button
                                                onClick={() => handlePin(task._id, task.pinned)}
                                                className="relative text-gray-500 hover:text-blue-500"
                                                title={task.pinned ? 'Unpin task' : 'Pin task'}
                                            >
                                                {task.pinned ? (
                                                    <LuPinOff className="text-2xl text-blue-500 hover:scale-105 transition-transform duration-300" />
                                                ) : (
                                                    <LuPin className="text-2xl text-gray-500 hover:text-blue-500 hover:scale-105 transition-transform duration-300" />
                                                )}
                                            </button>
                                        </div>

                                        <p className="text-xl mt-2">{task.description}</p>
                                        <p className="blog-date text-blue-800 mt-6">{formatDate(task.date)}</p>
                                        <p className="text-lg mt-2 flex gap-2">
                                            <span className="font-semibold">Status: </span>
                                            {task.status === 'Completed' ? (
                                                <span className="text-green-500 flex justify-start font-bold text-xl items-center gap-1">
                                                    Completed <FaCheckCircle className="text-xl" />
                                                </span>
                                            ) : task.status === 'In Progress' ? (
                                                <span className="text-yellow-500 flex justify-start font-bold text-xl items-center gap-1">
                                                    In Progress <FaSpinner className="text-xl animate-spin" />
                                                </span>
                                            ) : task.status === 'To Do' ? (
                                                <span className="text-blue-500 flex justify-start font-bold text-xl items-center gap-1">
                                                    To Do <FaRegHourglass className="text-xl " />
                                                </span>
                                            ) : null}
                                        </p>
                                        <div className="flex justify-end gap-2 mt-2">
                                            <button
                                                onClick={() => handleEdit(task)}
                                                className="p-1 md:text-xl bg-green-500 text-white rounded hover:scale-105 transition-transform duration-300"
                                            >
                                                <FaEdit className="font-xl" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(task._id)}
                                                className="p-1 md:text-xl bg-red-500 text-white rounded hover:scale-105 transition-transform duration-300"
                                            >
                                                <FaTrash className="font-xl" />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tasks;
