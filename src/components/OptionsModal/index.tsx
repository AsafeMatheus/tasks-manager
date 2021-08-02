import React from "react"
import { 
    View, 
    Text, 
    Modal, 
    ModalProps,
    TouchableOpacity,
    FlatList 
} from "react-native"

import { useNavigation } from "@react-navigation/native"

import { styles } from "./styles"

type OptionsProps = {
    id: string,
    title: string,
    function?: any
}

type Props = ModalProps & {
    data: Array<OptionsProps>,
    closeModal: () => void
}

export function OptionsModal({ data, closeModal, ...rest } : Props){
    const navigation = useNavigation()

    const handleMembers = () => {
        navigation.navigate('GroupMembers')
    }

    return(
        <Modal
            animationType="none"
            transparent={true}
            {...rest}
        >
            <TouchableOpacity 
                style={styles.container}
                onPress={() => closeModal()}
            >
                <View style={styles.content}>
                    <FlatList 
                        data={data}
                        keyExtractor={item => item.id}
                        renderItem={({item}) => {
                            return(
                                <TouchableOpacity 
                                    style={styles.button}
                                    onPress={item.function}
                                >
                                    <Text style={styles.title}>{item.title}</Text>
                                </TouchableOpacity>
                            )
                        }}
                        ItemSeparatorComponent={() => {
                            return(
                                <View style={styles.divider} />
                            )
                        }}
                    />
                </View>
            </TouchableOpacity>
        </Modal>
    )
}