import { GetServerSideProps } from 'next'
import { signIn } from 'next-auth/client'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

type SignInProps = {
  params: {
    sigSlug: string
  }
}

const SignIn = ({ params }: SignInProps) => {
  const [values, setValues] = useState({ sigSlug: params.sigSlug })
  const { push } = useRouter()

  const handleInput = (field: string, value: string) => {
    setValues((s) => ({ ...s, [field]: value }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    // sign in
    const result = await signIn('credentials', {
      ...values,
      redirect: false,
      callbackUrl: `${process.env.NEXTAUTH_URL}/${params.sigSlug}`
    })

    if (result?.url) {
      return push(`/${params.sigSlug}`)
    }

    // jogar o erro
    console.error('email ou senha inválida')
  }

  return (
    <>
      <h1>SignIn: {params.sigSlug}</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          placeholder="Email"
          type="email"
          onChange={(v) => handleInput('email', v.target.value)}
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          onChange={(v) => handleInput('password', v.target.value)}
        />

        <button type="submit">Sign in now</button>
      </form>
    </>
  )
}

export default SignIn

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context

  return {
    props: {
      params
    }
  }
}
