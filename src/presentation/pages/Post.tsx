import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { PostRepository } from '../../data/repositories/PostRepository';
import { PostDataSource } from '../../data/datasources/PostDataSource';
import { usePostQuery } from '../../infrastructure/hooks/post/usePostQuery';
import { Button } from '@mui/material';
import { useDeletePostMutation } from '../../infrastructure/hooks/post/useDeletePostMutation';
import { RESPONSE_STATUS } from '../../shared/utils/enums/ResponseStatus';
import type { Post } from '../../domain/entities/Post';



export default function Posts() {

  const [data, setData] = useState<Post[]>([]);

  const postRepository = new PostRepository(new PostDataSource());
  const { data: fetchedData, isLoading } = usePostQuery(postRepository);
  const deleteMutation = useDeletePostMutation(postRepository);

  const [loadingId, setLoadingId] = useState<number | null>();

  async function handleDelete(id:number) {
    setLoadingId(id);
    const result = await deleteMutation.mutateAsync(id);
    if(result.status === RESPONSE_STATUS.SUCCESS)
       setData(prev => prev.filter((row: Post) => row.id !== id));
    setLoadingId(null);
  }

  useEffect(() => {
    if (fetchedData) setData(fetchedData);
  }, [fetchedData]);

  return ( 
    isLoading ? <div>Loading...</div> :
    <TableContainer component={Paper} sx={{ mb:3 }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>[#]</TableCell>
            <TableCell align="left">Title</TableCell>
            <TableCell align="left">Description</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.title}</TableCell>
              <TableCell align="left">{row.body}</TableCell>
              <TableCell align="center">
                <div className='d-flex align-items-center'>
                  <Button color='primary' variant='contained' sx={{ mr:1 }}>Edit</Button>
                  <Button color='error' variant='contained' key={row.id} onClick={() => handleDelete(row.id)} loading={ loadingId == row.id && deleteMutation.isPending}>Delete</Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}