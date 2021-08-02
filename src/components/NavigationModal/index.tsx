import React from "react"
import { 
    View, 
    Text, 
    Modal, 
    ModalProps, 
    TouchableOpacity, 
    TouchableOpacityProps 
} from "react-native"

import { useNavigation } from "@react-navigation/native"

import { SettingOption } from "../SettingOption"

import { styles } from "./styles"

type Props = ModalProps & {
    closeView: () => void
}

export function NavigationModal({ closeView, ...rest } : Props){
    const navigation = useNavigation()

    const handleFirstScreenOption = () => {
        navigation.navigate('FirstScreenOption')
        closeView()
    }

    const handleRemindersSettings = () => {
        navigation.navigate('RemindersSettings')
        closeView()
    }

    return(
        <Modal
            animationType="none"
            transparent={true}
            {...rest}
        >
            <TouchableOpacity onPress={closeView} style={styles.container}>
                <View style={styles.content}>
                    <SettingOption
                        title='Primeira tela'
                        onPress={handleFirstScreenOption} 
                    />
                    <SettingOption
                        title='Ajustar lembretes'
                        onPress={handleRemindersSettings} 
                    />
                </View>
            </TouchableOpacity>
        </Modal>
    )
}