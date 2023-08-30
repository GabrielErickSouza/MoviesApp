import { View, FlatList, ActivityIndicator } from "react-native";
import * as C from './styles';
import { MagnifyingGlass } from "phosphor-react-native";
import { useEffect, useState } from "react";
import {api} from '../../service/api'
import { CardMovies } from "../../components/CardMovies";

type Movie = {
    id:number,
    title:string,
    post_path:string,
    overview:string
}

export function Home(){
    const [discoveryMovies,setDiscoveryMovies] = useState<Movie[]>([])
    const [page,setPage] = useState(1)
    const [loading,setLoading] = useState(false)

    useEffect(() =>{
        loadMoreData();
    },[])

    const loadMoreData = async () =>{
        const response = await api.get('/movie/popular',{
            params:{
                page
            }
        })
        setDiscoveryMovies([...discoveryMovies,...response.data.results])
        setPage(page + 1)
        setLoading(false)
    }
    return(
        <C.Container>
            <C.Header>
                <C.HeaderText>O que Você quer assistir hoje?</C.HeaderText>
                <C.ContainerInput>
                    <C.Input 
                        placeholderTextColor={"#fff"}
                        placeholder="Buscar"
                    />
                    <MagnifyingGlass color="#FFf" size={25} weight="light" />
                </C.ContainerInput>
            </C.Header>
            <View>
                <FlatList 
                    data={discoveryMovies}
                    numColumns={3}
                    renderItem={(item) =>  <CardMovies data={item.item}/>}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{padding:35}}
                    keyExtractor={item => item.id.toString()}
                    onEndReached={() => loadMoreData()}
                />
                {loading && <ActivityIndicator size={50} color={"#02966e5"}/>}
            </View>
        </C.Container>
    )
} 