import { View, Text, Image, FlatList } from "react-native"
import { myColor } from "../../component/myColor"

export const Home = () => {

    const tmpData = [
        {
            id:0,
            title: "Test",
            img: "https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg?w=2000",
            creator: "Narudon Saehan",
            like: 10,
        },
        {
            id:1,
            title: "Test",
            img: "https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg?w=2000",
            creator: "Narudon Saehan",
            like: 10,
        },
        {
            id:2,
            title: "Test",
            img: "https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg?w=2000",
            creator: "Narudon Saehan",
            like: 10,
        },
        {
            id:3,
            title: "Test",
            img: "https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg?w=2000",
            creator: "Narudon Saehan",
            like: 10,
        },
        {
            id:4,
            title: "Test",
            img: "https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg?w=2000",
            creator: "Narudon Saehan",
            like: 10,
        },
    ]
    const renderItem = ({ item, index }) => {
        return (
            <View key={index} style={{ width: "100%", marginBottom: 10 ,marginTop:(index===0)?10:0}}>
                <View style={{ marginLeft: 20, marginRight: 20, backgroundColor: myColor.neutral, borderRadius: 20 }}>
                    <Image
                        style={{ width: "100%", height: 150, resizeMode: 'cover', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
                        source={{ uri: item.img }}
                    ></Image>
                    <View style={{ paddingLeft: 20, paddingRight: 20 }}>
                        <Text>{item.title}</Text>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Text>by:{item.creator}</Text>
                            <Text>like:{item.like}</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
    return (
        <View style={{ flex: 1, backgroundColor: myColor.primary }}>
            <View style={{backgroundColor:myColor.secondary,width:"100%",paddingLeft:10}}>
                <Text style={{color:myColor.accent,fontSize:50}}>Hello</Text>
                <Text style={{color:myColor.accent,fontSize:30}}>Narudon Saehan</Text>
            </View>
            <FlatList
                data={tmpData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                // ItemSeparatorComponent={() => (<Divider />)}
                // ListEmptyComponent={headleEmpty}
            >
            </FlatList>
        </View>
    )
}