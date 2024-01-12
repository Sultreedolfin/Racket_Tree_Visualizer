import treeLogo from '../assets/treelogo.svg'
import '../App.css'
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={treeLogo} className="logo react" alt="Tree gif" />
        </a>
      </div>
      <h1>Racket Tree Visualizer</h1>
      <br></br>
      <button className="btn" onClick={() => navigate('visualize')}>Start Visualizing</button>
      
    </>
  )
}

export default HomePage
