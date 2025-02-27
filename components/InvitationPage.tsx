"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function InvitationPage() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsLoading(true)
      try {
        const response = await fetch("https://corrai.tech/app-api/member/invitation/book", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "tenant-id": "1",
          },
          body: JSON.stringify({ email }),
        })

        if (response.ok) {
          setSubmitted(true)
        } else {
          const errorData = await response.json().catch(() => null)
          console.error("Error submitting invitation:", errorData || response.statusText)
          alert("Failed to submit invitation. Please try again.")
        }
      } catch (error) {
        console.error("Error submitting invitation:", error)
        alert("Failed to submit invitation. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-4">
      <div className="w-full max-w-md mx-auto flex flex-col items-center">
        <div className="mb-8">
          <CorrAILogo />
        </div>

        <Card className="w-full bg-black border-gray-800">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold text-white">Join CorrAI</CardTitle>
            <CardDescription className="text-gray-400">Enter your email to get started with CorrAI</CardDescription>
          </CardHeader>
          <CardContent>
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Input
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-500"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-[#FFA500] hover:bg-[#FF8C00] text-black font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? "Submitting..." : "Get Invited"}
                  {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
              </form>
            ) : (
              <div className="py-4 text-center space-y-4">
                <div className="mx-auto w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Check className="h-6 w-6 text-green-500" />
                </div>
                <p className="text-white">Thanks! We'll send you an invitation soon.</p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-center text-gray-400">
              We'll email you when your account is ready to be set up.
            </div>
            {!submitted && (
              <div className="text-sm text-center">
                Already have an account?{" "}
                <Link href="/login" className="text-blue-400 hover:text-blue-300">
                  Log in
                </Link>
              </div>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

function CorrAILogo() {
  return (
    <svg width="120" height="40" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 10 L30 20 L20 30 L10 20 Z" stroke="white" strokeWidth="2" fill="none" />
      <text x="40" y="25" fill="white" fontSize="24" fontWeight="bold">
        CorrAI
      </text>
    </svg>
  )
}

