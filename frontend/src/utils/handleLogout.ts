const handleLogout = () => {
    localStorage.setItem("token", ""); 
}

export default handleLogout;