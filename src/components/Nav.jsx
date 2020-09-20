import React from 'react'
import Navbar from './Navbar'
import { withRouter } from 'react-router-dom'
import { useMeasure } from 'react-use';
import { useUpdateWindowSize } from '../contexts/WindowSize';
import { useWindowDimensions } from '../hooks/useWindowDimensions';

const Nav = ({ history }) => {
  const [ref, navDimensions] = useMeasure();
  const windowDimensions = useWindowDimensions();
  const updateWindowSize = useUpdateWindowSize();

  updateWindowSize({
      navbarHeight: navDimensions.height,
      totalHeight: windowDimensions.height,
      mainHeight: windowDimensions.height - navDimensions.height, // total - navbar = mainHeight
      totalWidth: windowDimensions.width,
    }
  )
  return (
    <div ref={ref}>
      <div className='flex-center'>
        <h4 className='heading'
          onClick={() => history.push('/')}>
          STEPHEN RAWLS
      </h4>
      </div>
      <Navbar />
    </div>
)
}


export default withRouter(Nav)
