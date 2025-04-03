import React from 'react'

export const FooterComponent = ({ className }) => {
  return (
    <div>
        <footer className={className}>
            <span>Copyright © 2025 Chance Lu</span>
            <a href="https://github.com/Chance38" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-github github-icon"/>
            </a>
        </footer>
    </div>
  )
}

export default FooterComponent