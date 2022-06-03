import React from 'react'

// COMPONENTS

import { useFirebase } from '../../../context/FirebaseContext'

function Profile() {
  const {user } = useFirebase()

  console.log(user)
  return (
    <div>
    </div>
  )
}

export default Profile