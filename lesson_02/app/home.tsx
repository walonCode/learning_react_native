import { View, Text, Alert, FlatList, ActivityIndicator, StyleSheet } from 'react-native'
import { useEffect, useState } from 'react'
import axios from "axios"

export default function Home() {
  const [data, setData] = useState([])
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = async(limit = 10) => {
    try{
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/?_limit=${limit}`)
        if (response.status === 200){
          console.log(response.data)
          setData(response.data)
          setIsLoading(false)
        }
    }catch(error){
      console.log(error)
      Alert.alert("error fetching the posts")
    }
  }

  useEffect(() => {
    fetchData()
  },[])

  const handleRefresh = async(limit:any) => {
    setIsRefreshing(true)
    await fetchData(limit)
  }

  if(isLoading){
    return(
      <View style={{
        flex:1,
        alignContent:"center",
        justifyContent:"center"
      }}>
        <ActivityIndicator
        size="large"
        color="blue"
        />
        <Text style={{
          color:"blue", textAlign:"center"
        }}>Loading....</Text>
      </View>
    )
  }

  return (
    <View style={{
      flex:1,
      alignItems:"center",
      justifyContent:"center"
    }}>
      <FlatList
      data={data}
      keyExtractor={({item}:{item:any}) => item?.id}
      renderItem={({ item }:{item:any}) => {
        return (
          <View style={style.card}>
            <Text style={style.title}> {item.title}</Text>
            <Text style={style.description}> {item.body} </Text>
          </View>
        )
      }}
      ListEmptyComponent={() => {
        return(
          <View style={{
            flex:1,
            alignItems:"center",
            justifyContent:"center"
          }}>
            <Text>
              Post not found
            </Text>
          </View>
        )
      }}
      ItemSeparatorComponent={() => {
        return(
          <View style={{
            marginBottom:10
          }}></View>
        )
      }}
      ListHeaderComponent={() => {
        return(
          <Text style={{
            fontSize:20,
            textAlign:"center",
            marginBottom:10,
            fontWeight:"500"
          }}>
            Posts
          </Text>
        )
      }}
      showsVerticalScrollIndicator={false}
      ListFooterComponent={() => (
        <Text style={{ textAlign:"center", marginTop:10, fontWeight:"bold", fontSize:20}}>
          End of Post list
        </Text>
      )}
      onRefresh={() => handleRefresh(20)}
      refreshing={isRefreshing}
      />
    </View>
  )
}

const style = StyleSheet.create({
  card:{
    borderWidth:1,
    height:250,
    width:350,
    padding:10,
    borderRadius:16,
  },
  title:{
    fontSize:20,
    fontWeight:"bold",
    textAlign:"center",
    marginBottom:5
  },
  description:{
    fontSize: 16,
    fontWeight:"400",
  }
})