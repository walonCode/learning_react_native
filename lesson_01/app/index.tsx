import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Pressable,
  Alert,
  ScrollView,
  Platform,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar
} from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from "@expo/vector-icons"
import PokemonCard from '@/components/PokemonCard'
import axios from "axios";

export default function Index() {
  const [searchTerm, setSearchTerm] = useState("")
  const [data, setData] = useState({})

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`)
      if (response.status === 200) {
        setSearchTerm("")
        setData(response.data)
      }
    } catch (error) {
      console.log(error)
      Alert.alert("Search failed")
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView className='bg-white' keyboardShouldPersistTaps="handled" >
        <SafeAreaView className={`flex-1 flex-col ${Platform.OS === "android" ? "pt-10" : ""} items-center`}>
          <StatusBar barStyle="default" hidden={false} backgroundColor="black" />
          <View>
            <Text className='font-bold text-3xl mb-2'>
              Search for a Pokemon
            </Text>
          </View>
          <View className='flex-row items-center gap-2 mt-2 mb-2'>
            <TextInput
              value={searchTerm}
              onChangeText={setSearchTerm}
              placeholder='Enter pokemon name'
              placeholderTextColor="black"
              secureTextEntry={false}
              autoCapitalize="none"
              autoCorrect={false}
              className='border-2 border-black w-[340] rounded-full px-2 py-4'
              style={{
                ...Platform.select({
                  ios: {
                    shadowOffset: { width: 10, height: 10 },
                    shadowColor: "blue",
                    shadowOpacity: 0.9,
                    shadowRadius: 20
                  },
                  android: {
                    elevation: 20,
                  }
                })
              }}
            />
            <Pressable onPress={handleSearch}>
              <View>
                <Ionicons name="search" color="black" size={30} />
              </View>
            </Pressable>
          </View>
          <View className='mt-20'>
            <PokemonCard data={data} />
          </View>
          <View className='mt-20'>
            <PokemonCard data={data} />
          </View>
          <View>
            <Button
              title='Hello'
              onPress={() =>
                Alert.alert(
                  "Hello",
                  "fix the error",
                  [
                    { text: "Cancel", onPress: () => console.log("cancel"), style:"destructive" },
                    { text: "Ok", onPress: () => console.log("ok") }
                  ],
                  { cancelable: true }
                )
              }
            />
          </View>
        </SafeAreaView>
      </ScrollView>
    </TouchableWithoutFeedback>
  )
}
