import { Component } from 'react'
import { Link, NavLink } from 'react-router';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default class Header extends Component {

  render() {

    const links = [
      { title: 'Posts', to: '/posts' },
      { title: 'Comments', to: '/comments' },
      { title: 'Albums', to: '/albums' },
      { title: 'Products', to: '/products' },
      { title: 'Todos', to: '/todos' },
      { title: 'Users', to: '/users' }
    ];

    return (
        <header className='mb-4 bg-primary text-center'>
          <div className='d-flex justify-content-center align-items-center'>
            <nav>
              <ul>
                  {links.map(link => {
                    return (
                      
                      <li key={link.to} className='d-inline-block mx-2'>
                        <NavLink to={link.to} key={link.to} className='mx-2'>
                          {link.title}
                        </NavLink>
                      </li>
                    ) 
                  })}
                </ul>
            </nav>
          </div>
        </header>
      
    )
  }
}