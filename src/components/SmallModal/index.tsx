import React from "react"
import { 
    View,
    Modal, 
    Text, 
    ModalProps 
} from "react-native"

import { styles } from "./styles"

type Props = ModalProps & {
    textColor: string
    title: string
}

export function SmallModal({ textColor, title, ...rest } : Props){
    return(
        <Modal
            animationType="none"
            transparent={true}
            {...rest}
        >
            <View style={styles.container}>
                <Text style={[styles.title, { color: textColor }]}>
                    {title}
                </Text>
            </View>
        </Modal>
    )
}