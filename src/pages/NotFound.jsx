import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div style={styles.container}>
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
            100% { transform: translateY(0px); }
          }
          @keyframes pulse {
            0% { opacity: 0.8; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.05); }
            100% { opacity: 0.8; transform: scale(1); }
          }
          .not-found-btn {
            background-color: #305858;
            color: #ffffff;
            padding: 14px 28px;
            border-radius: 8px;
            font-size: 1.1rem;
            font-weight: 600;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 10px;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(48, 88, 88, 0.3);
          }
          .not-found-btn:hover {
            background-color: #39838A;
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(57, 131, 138, 0.4);
          }
          .glitch-wrapper {
            position: relative;
          }
          .circle-bg {
            position: absolute;
            width: 400px;
            height: 400px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(48,88,88,0.05) 0%, rgba(255,255,255,0) 70%);
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 0;
            animation: pulse 4s ease-in-out infinite;
          }
        `}
      </style>
      
      <div className="circle-bg"></div>
      
      <div style={styles.content}>
        <div style={styles.iconContainer}>
          <AlertCircle size={64} color="#305858" strokeWidth={1.5} style={{ animation: 'float 3s ease-in-out infinite' }} />
        </div>
        
        <h1 style={styles.title}>404</h1>
        
        <h2 style={styles.subtitle}>Oops! Page Not Found</h2>
        
        <p style={styles.text}>
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. 
          Let's get you back on track.
        </p>
        
        <div style={{ marginTop: '2rem' }}>
          <Link to="/" className="not-found-btn">
            <Home size={20} />
            Back to Home
          </Link>
        </div>
      </div>
      
      <div style={styles.watermark}>IBMSSP</div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  content: {
    textAlign: 'center',
    zIndex: 1,
    padding: '0 20px',
    maxWidth: '600px',
  },
  iconContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '1rem',
  },
  title: {
    fontSize: '8rem',
    fontWeight: '800',
    color: '#305858',
    margin: '0',
    lineHeight: '1',
    letterSpacing: '-2px',
    background: 'linear-gradient(135deg, #305858 0%, #39838A 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  subtitle: {
    fontSize: '2rem',
    color: '#1E1F1E',
    fontWeight: '600',
    marginTop: '1rem',
    marginBottom: '1rem',
  },
  text: {
    fontSize: '1.1rem',
    color: '#798382',
    lineHeight: '1.6',
    margin: '0 auto',
    maxWidth: '480px',
  },
  watermark: {
    position: 'absolute',
    bottom: '-5%',
    left: '50%',
    transform: 'translateX(-50%)',
    fontSize: '20vw',
    fontWeight: '900',
    color: 'rgba(48, 88, 88, 0.03)',
    pointerEvents: 'none',
    zIndex: 0,
    whiteSpace: 'nowrap',
    userSelect: 'none',
  }
};
