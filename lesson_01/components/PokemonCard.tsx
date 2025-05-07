import { View, Text, Image } from 'react-native'
import React from 'react'

export default function PokemonCard({data}:{data:any}) {
  return (
    <View className='border-2  w-[350] h-[400] px-2 shadow-slate-200 '>
      <View className='flex-row justify-between items-center mt-5 mb-2 mx-2 '>
        <Text className='font-bold text-xl' >{data.name}</Text>
        <Text className='font-thin border-2 py-2 px-2 rounded-full border-black/50'>Pokemon Experience: {data.base_experience} </Text>
      </View>
      <View className='items-center my-4'>
        <Image source={{ uri:`${data?.sprites?.front_default}`}} height={100} width={100}/>
      </View>
      <View className='flex-row items-center justify-between mx-5'>
        <Text className='font-bold text-2xl'>weight: {data.weight}</Text>
        <View className='flex-col items-center '>
          {data?.abilities?.map((ability:any, index:number) => (
            <Text key={index}> 
              Ability: {ability?.name}
            </Text>
          ))}
        </View>
      </View>
    </View>
  )
}