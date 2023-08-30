
import * as C from './styles'
type Movie = {
    id:number,
    poster_path:string
}

type Props = {
    data: Movie,
    onPress?: () => void
}

export function CardMovies({data, ...rest}:Props){
    return(
        <C.CardMovies {...rest}>
            <C.CardImage source={{uri:`https//image.tmdb.org/t/p/w500${data.poster_path}`}}/>
        </C.CardMovies>
    )
}