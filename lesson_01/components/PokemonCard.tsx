import { View, Text, Image, StyleSheet, Platform, ScrollView } from 'react-native'
import React from 'react'

export default function PokemonCard({data}:{data:any}) {
  return (
   <ScrollView>
     <View style={style.card}>
      <View className='flex-row justify-between items-center mt-5 mb-2 mx-2 '>
        <Text className='font-bold text-xl capitalize' >{data?.name}</Text>
        <Text className='font-thin border-2 py-2 px-2 rounded-full border-black/50'>Pokemon Experience: {data.base_experience} </Text>
      </View>
      <View className='items-center my-4'>
        <Image source={{ uri:`${data?.sprites?.front_default}`}} height={150} width={120}/>
      </View>
      <View className='flex-row items-center justify-between mx-5'>
        <Text className='font-bold text-2xl'>Weight: {data.weight}</Text>
        <View className='flex-col items-center '>
          {data?.abilities?.map((ability:any, index:number) => (
            <Text key={index} className='capitalize text-black'> 
              Ability: {ability?.ability?.name}
            </Text>
          ))}
        </View>
      </View>
      <View>
        {data?.moves?.slice(0,5)?.map((move:any, index:number) => (
          <Text key={index} className="capitalize">
            Moves: {move?.move?.name}
          </Text>
        ))}
      </View>
      <View className='mt-2 '>
        {data?.types?.map((type:any,index:any) => (
          <Text key={index} className='font-bold text-[15px] capitalize'>
            Type: {type?.type?.name}
          </Text>
        ))}
      </View>
    </View>
   </ScrollView>
  )
}

const style = StyleSheet.create({
  card:{
    borderWidth:2,
    backgroundColor:'white',
    borderRadius:16,
    width:350,
    height:450,
    padding:16,
    margin:16,
    ...Platform.select({
      ios:{
        shadowOffset:{width:10, height:10},
        shadowColor:"white",
        shadowOpacity: 0.4,
        shadowRadius:5
      },
      android:{
        elevation:20
      }
    })
  }
})

//for shadows in ios use the shadow properties
//for android use the evelation properties