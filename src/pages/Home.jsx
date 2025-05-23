import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
} from '@mui/material';
import { userService } from '../services/userService';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { user } = useAuth();

  const fetchUsers = async () => {
    try {
      const data = await userService.getAll();
      setUsers(data);
    } catch (error) {
      setError('Error obteniendo usuarios');
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleOpenDialog = (user = null) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        username: user.username,
        email: user.email,
        password: '',
      });
    } else {
      setEditingUser(null);
      setFormData({
        username: '',
        email: '',
        password: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingUser(null);
    setFormData({
      username: '',
      email: '',
      password: '',
    });
    setError('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      if (editingUser) {
        await userService.update(editingUser.id, formData);
        setSuccess('Usuario actualizado');
      } else {
        await userService.create(formData);
        setSuccess('Usuario creado');
      }
      handleCloseDialog();
      fetchUsers();
    } catch (error) {
      setError(error.response?.data?.message || 'Error');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Seguro que quiere eliminar?')) {
      try {
        await userService.delete(id);
        setSuccess('Usuario eliminado');
        fetchUsers();
      } catch (error) {
        setError('Error eliminando usuario');
      }
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1">
            Lista de Usuarios
          </Typography>
          <Button variant="contained" onClick={() => handleOpenDialog()}>
            Nuevo Usuario
          </Button>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        <TableContainer 
          sx={{ 
            border: '2px solid #ccc',
            backgroundColor: '#fff'
          }}
        >
          <Table 
            sx={{
              '& .MuiTableCell-root': {
                border: '1px solid #ddd',
                padding: '8px',
                backgroundColor: '#f9f9f9'
              }
            }}
          >
            <TableHead>
              <TableRow sx={{ backgroundColor: '#e0e0e0' }}>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#d0d0d0 !important' }}>ID</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#d0d0d0 !important' }}>Usuario</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#d0d0d0 !important' }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#d0d0d0 !important' }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user, index) => (
                <TableRow 
                  key={user.id}
                  sx={{
                    backgroundColor: index % 2 === 0 ? '#ffffff' : '#f5f5f5',
                    '&:hover': {
                      backgroundColor: '#eeeeee'
                    }
                  }}
                >
                  <TableCell sx={{ border: '1px solid #ddd' }}>{user.id}</TableCell>
                  <TableCell sx={{ border: '1px solid #ddd' }}>{user.username}</TableCell>
                  <TableCell sx={{ border: '1px solid #ddd' }}>{user.email}</TableCell>
                  <TableCell sx={{ border: '1px solid #ddd' }}>
                    <Button
                      size="small"
                      onClick={() => handleOpenDialog(user)}
                      sx={{ 
                        mr: 1,
                        backgroundColor: '#e0e0e0',
                        color: '#000',
                        '&:hover': { backgroundColor: '#d0d0d0' }
                      }}
                    >
                      Editar
                    </Button>
                    <Button
                      size="small"
                      onClick={() => handleDelete(user.id)}
                      sx={{ 
                        backgroundColor: '#ffcccb',
                        color: '#000',
                        '&:hover': { backgroundColor: '#ffaaaa' }
                      }}
                    >
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {editingUser ? 'Editar Usuario' : 'Nuevo Usuario'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              fullWidth
              label="Usuario"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              margin="normal"
              required={!editingUser}
              helperText={editingUser ? "Dejar vacio para mantener" : ""}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancelar</Button>
            <Button type="submit" variant="contained">
              {editingUser ? 'Actualizar' : 'Crear'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  );
};

export default Home; 