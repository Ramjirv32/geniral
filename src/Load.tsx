import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'
import LightRays from './LightRays'
import genniralLogo from './assets/logo.png'

function LoadingScreen() {
  const navigate = useNavigate()
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [logoOpacity, setLogoOpacity] = useState(0)
  const [textVisible, setTextVisible] = useState(false)
  const [blurAmount, setBlurAmount] = useState(5) // Initial blur amount
  const [blurInterval, setBlurInterval] = useState(1000) // Start with 1 second

  useEffect(() => {
    // Fade in logo animation
    const logoTimer = setTimeout(() => {
      setLogoOpacity(1)
    }, 300)

    // Show loading text after logo appears
    const textTimer = setTimeout(() => {
      setTextVisible(true)
    }, 800)

    // Simulate loading progress
    const loadingInterval = setInterval(() => {
      setLoadingProgress(prev => {
        const nextProgress = prev + Math.random() * 15
        return nextProgress > 100 ? 100 : nextProgress
      })
    }, 400)

    // Blur/unblur effect with increasing interval
    let currentInterval = blurInterval
    let intervalCounter = 0
    
    const blurEffect = setInterval(() => {
      setBlurAmount(prev => (prev === 0 ? 5 : 0)) // Toggle between blurred and clear
      
      // Increase interval duration gradually up to 10 seconds
      intervalCounter++
      if (intervalCounter % 2 === 0 && currentInterval < 10000) {
        currentInterval += 1000 // Increase by 1 second
        setBlurInterval(currentInterval)
        clearInterval(blurEffect)
        
        // Restart interval with new duration
        setTimeout(() => {
          const newBlurEffect = setInterval(() => {
            setBlurAmount(prev => (prev === 0 ? 5 : 0))
          }, currentInterval)
          
          // Clear this interval when component unmounts
          return () => clearInterval(newBlurEffect)
        }, currentInterval)
      }
    }, blurInterval)

    // Navigate to main page when loading is complete
    const navigationTimer = setTimeout(() => {
      navigate('/')
    }, 4000) // Adjust time as needed - currently set to 4 seconds

    // Clean up all timers
    return () => {
      clearTimeout(logoTimer)
      clearTimeout(textTimer)
      clearInterval(loadingInterval)
      clearTimeout(navigationTimer)
      clearInterval(blurEffect)
    }
  }, [navigate, blurInterval])

  return (
    <div style={{ 
      backgroundColor: '#0a0a18', 
      minHeight: '100vh', 
      display: 'flex',
      flexDirection: 'column',
      color: 'white'
    }}>
      <div style={{ position: 'relative', overflow: 'hidden', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        {/* Background light rays */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
          <LightRays
            raysOrigin="top-center"
            raysColor="#ffffff"
            raysSpeed={1.5} // Slightly faster for loading screen
            lightSpread={1.2}
            rayLength={1.8}
            followMouse={false} // Disable mouse following during loading
            mouseInfluence={0}
            noiseAmount={0.08} // More noise for dynamic effect
            distortion={0.05} // More distortion
            pulsating={true}
            fadeDistance={1.2}
            saturation={0.5}
            className="background-rays"
          />
        </div>
        
        {/* Logo in center with fade-in effect */}
        <div style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          flexDirection: 'column',
          zIndex: 1,
          pointerEvents: 'none',
          transition: 'opacity 1s ease-in-out'
        }}>
          <img 
            src={genniralLogo} 
            alt="Genniral Logo" 
            style={{ 
              maxWidth: '400px', 
              width: '40%',
              opacity: logoOpacity,
              transition: 'all 0.8s ease-in-out',
              animation: 'pulse 2s infinite ease-in-out',
              filter: `blur(${blurAmount}px)` // Apply dynamic blur effect
            }} 
          />
          
          {/* Loading text appears after logo */}
          {textVisible && (
            <div style={{ 
              marginTop: '50px', 
              textAlign: 'center',
              animation: 'fadeIn 1s forwards'
            }}>
              <div style={{ fontSize: '1.5rem', letterSpacing: '2px', marginBottom: '15px' }}>
                INITIALIZING
              </div>
              
              {/* Progress bar */}
              <div style={{ 
                width: '300px', 
                height: '4px', 
                background: 'rgba(255,255,255,0.1)', 
                borderRadius: '2px',
                overflow: 'hidden'
              }}>
                <div style={{ 
                  height: '100%', 
                  width: `${loadingProgress}%`, 
                  background: 'rgba(255,255,255,0.7)',
                  transition: 'width 0.4s ease-out',
                  boxShadow: '0 0 10px rgba(255,255,255,0.7)'
                }} />
              </div>
              
              {/* Progress percentage */}
              <div style={{ 
                marginTop: '10px', 
                fontSize: '14px',
                opacity: 0.8
              }}>
                {Math.round(loadingProgress)}%
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Add these CSS animations to your App.css file
const styles = `
@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.03); }
  100% { transform: scale(1); }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
`;

// Include this style tag
document.head.insertAdjacentHTML('beforeend', `<style>${styles}</style>`);

export default LoadingScreen
