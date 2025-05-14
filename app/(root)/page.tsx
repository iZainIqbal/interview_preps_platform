
import InterviewCard from '@/Components/interviewCard'
import { Button } from '@/Components/ui/button'
import { dummyInterviews } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <>
      <section className='card-cta'>
        <div className='flex flex-col gap-6 max-w-lg'>
          <h2>Get Interview-Ready with AI-Powered Practice & Feedback </h2>
          <p className='text-lg'>Practice coding interviews with AI-generated questions and receive instant feedback to improve your skills.</p>
          <p className='text-lg'>Join our community of developers and ace your next interview!</p>

          <Button asChild className='btn-primary max-sm:w-full '>
            <Link href="/interview">Start an Interview</Link>
          </Button>

          
        </div>

        <Image src="/robot.png" alt="Robot" width={400} height={400} className='max-sm:hidden' />
      </section>

      <section className='flex flex-col gap-6 mt-8 '>
        <h2>Your Interviews</h2>
        <div className="interviews-section">
         {dummyInterviews.map((interview) => (
          <InterviewCard {... interview} key={interview.id} />
        ) )}
        {/* <p>You have'nt taken any Interviews yet.</p> */}
        </div>
      </section>

      <section className='flex flex-col gap-6 mt-8 '>
        <h2>Take an Interview</h2>
        <div className="interviews-section">
          {dummyInterviews.map((interview) => (
          <InterviewCard {... interview} key={interview.id} />
        ) )}
          {/* <p>There are no Interviews Available</p> */}
        </div>
      </section>
    </>
  )
}

export default page