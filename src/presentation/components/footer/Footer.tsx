import { Component } from 'react'

export default class Footer extends Component {
  render() {
    return (
        <footer className='bg-primary text-white text-center mt-auto'>
            <p>Copyright &copy; {new Date().getFullYear()}. All Right Reserved</p>
        </footer>
      
    )
  }
}
