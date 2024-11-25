"use client"

import EmptyState from '@/components/EmptyState'
import LoaderSpinner from '@/components/LoaderSpinner'
import PodCastCard from '@/components/PodCastCard'
import Searchbar from '@/components/Searchbar'
import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'



import React, { use } from 'react'

const Discover = ({ searchParams } ) => {
  const {search} = use(searchParams)
  const podcastsData = useQuery(api.podcasts.getPodcastBySearch, {search : search || ""})
  return (
    <div className="flex flex-col gap-9">
      <Searchbar/>
      <div className="flex flex-col gap-9">
         <h1 className="text-20 font-bold text-white-1">
          {!search ? "Discover Trending Podcasts": "Search Results for: "}
          {search && <span className='text-white-2'>{search}</span>} 
         </h1>
      </div>

      {podcastsData ? (
        <>
          {podcastsData.length > 0 ? (
      
            <div className="podcast_grid">
              {podcastsData.map(({_id, podcastTitle, podcastDescription, imageURL}) => (
                <PodCastCard
                  key={_id}
                  imgUrl={imageURL!}
                  title={podcastTitle}
                  description={podcastDescription}
                  podcastId={_id}
                />
              ))}
              
            </div>
    
          ): <EmptyState title="No results found"/>}
        </>
      ):<LoaderSpinner/>}
      
    </div>
  )
}

export default Discover