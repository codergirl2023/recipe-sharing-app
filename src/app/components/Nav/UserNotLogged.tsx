import React, { Component } from 'react'
import Link from 'next/link'
export class UserNotLogged extends Component {
  render() {
    return (
        <div className="flex-end">
        <div>
        <Link href="/sign-up" className="black_btn" style={{marginRight:"4px"}}>
          Sign up
        </Link>
        </div>
        <div>
        <Link href="/login" className="black_btn">

          Log in
        </Link>
        </div>
      </div>
    )
  }
}

export default UserNotLogged
