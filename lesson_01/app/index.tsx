import { View, Text, SafeAreaView, TextInput, Pressable, Alert, ScrollView, Platform } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from "@expo/vector-icons"
import PokemonCard from '@/components/PokemonCard'
import axios from "axios";

export default function Index() {
  const [searchTerm, setSearchTerm] = useState("")
  const [data, setData] = useState({})
  
  const handleSearch = async() => {
    try{
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`)
      console.log(response.data)
      if (response.status === 200){
        setSearchTerm("")
        setData(response.data)
      }
    }catch(error){
      console.log(error)
      Alert.alert("search failed")
    }
  }
  return (
  <ScrollView className='bg-white'>
      <SafeAreaView className='flex-1 flex-col pt-16 items-center'>
      <View>
        <Text className='font-bold text-3xl mb-2'>
          Search from a Pokemon
        </Text>
      </View>
      <View className='flex-row items-center gap-2 mt-2 mb-2'> 
          <TextInput
          value={searchTerm}
          onChangeText={setSearchTerm}
          placeholder='Enter pokemnon name'
          secureTextEntry={false}
          autoCapitalize="none"
          autoCorrect={false}
          className='border-2 border-black w-[340] rounded-full px-2'
          style={{
            ...Platform.select({
              ios:{
                shadowOffset:{width:10, height:10},
                shadowColor:"white",
                shadowOpacity: 0.4,
                shadowRadius:5
              },
              android:{
                elevation:20,
              }
            })
          }}
          />
        <Pressable onPress={() => {handleSearch()}}>
          <View>
            <Ionicons name="search" color="black" size={30}/>
          </View>
        </Pressable>
      </View>
      <View className='mt-20'>
        <PokemonCard data={data}/>
      </View>
    </SafeAreaView>
  </ScrollView>
  )
}