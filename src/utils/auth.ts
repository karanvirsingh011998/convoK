export const logout = () => {
  sessionStorage.removeItem('currentUser');
  window.location.href = '/login';
}; 

export const initializeAdminUser = () => {
  const users = JSON.parse(sessionStorage.getItem('users') || '[]');
  
  const adminExists = users.some((user: any) => user.email === 'admin@yopmail.com');
  
  if (!adminExists) {
    const adminUser = {
      username: 'admin',
      email: 'admin@yopmail.com',
      password: 'Admin@12345', 
    };
    
    users.push(adminUser);
    sessionStorage.setItem('users', JSON.stringify(users));
  }
}; 