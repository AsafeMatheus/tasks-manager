import React from "react"
import { 
    View, 
    Text, 
    Modal, 
    ModalProps,
    TouchableOpacity 
} from "react-native"

import { styles } from "./styles"

type Props = ModalProps & {
    closeModal: () => void,
    set: any
}

export function PickColorModal({ set, closeModal, ...rest } : Props){
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
                    <TouchableOpacity 
                        style={[styles.button, {backgroundColor: '#FFFF00'}]}
                        onPress={() => {
                            set('#FFFF00')
                            closeModal()
                        }}
                    >
                        <Text style={styles.title}>Amarelo</Text>
                    </TouchableOpacity>
                    <View style={styles.divider} />

                    <TouchableOpacity 
                        style={[styles.button, {backgroundColor: '#42FF41'}]}
                        onPress={() => {
                            set('#42FF41')
                            closeModal()
                        }}
                    >
                        <Text style={styles.title}>Verde</Text>
                    </TouchableOpacity>
                    <View style={styles.divider} />

                    <TouchableOpacity 
                        style={[styles.button, {backgroundColor: '#FF8E01'}]}
                        onPress={() => {
                            set('#FF8E01')
                            closeModal()
                        }}
                    >
                        <Text style={styles.title}>Laranja</Text>
                    </TouchableOpacity>
                    <View style={styles.divider} />

                    <TouchableOpacity 
                        style={[styles.button, {backgroundColor: '#FFA5E8'}]}
                        onPress={() => {
                            set('#FFA5E8')
                            closeModal()
                        }}
                    >
                        <Text style={styles.title}>Rosa</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal>
    )
}