import React, { useState } from "react"
import { 
    SafeAreaView,
    Text,
    ScrollView,
    View 
} from "react-native"

import { useNavigation } from "@react-navigation/native"

import { MarkOption } from "../../components/MarkOption"
import { Header } from "../../components/Header"
import { Button } from "../../components/Button"

import { styles } from "./styles"

export function RemindersSettings(){
    const navigation = useNavigation()

    const [twoHours, setTwoHours] = useState(false)
    const [sameHour, setSameHour] = useState(true)
    const [oneHour, setOneHour] = useState(true)
    const [oneDay, setOneDay] = useState(false)
    const [song, setSong] = useState(false)

    return(
        <SafeAreaView style={styles.container}>
            <Header 
                title='Ajustar lembretes'
            />

            <ScrollView 
                style={{marginBottom: 70}} 
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.description}>
                    Aqui você pode ajustar como você deseja ser lembrado de seus compromissos
                    na sua agenda e nas agendas dos seus grupos que estiverem com o lembrete
                    ativado.
                </Text>

                <MarkOption
                    title='Alarme com som'
                    marked={song}
                    set={() => setSong(!song)}
                />

                <MarkOption
                    title='Lembrar um dia antes'
                    marked={oneDay}
                    set={() => setOneDay(!oneDay)}
                />

                <MarkOption
                    title='Lembrar 1h antes'
                    marked={oneHour}
                    set={() => setOneHour(!oneHour)}
                />

                <MarkOption
                    title='Lembrar 2h antes'
                    marked={twoHours}
                    set={() => setTwoHours(!twoHours)}
                />

                <MarkOption
                    title='Lembrar no horário'
                    marked={sameHour}
                    set={() => setSameHour(!sameHour)}
                />
            </ScrollView>

            <View style={styles.footer}>
                <Button
                    title='Confirmar'
                    onPress={() => {
                        navigation.navigate('Home')
                    }}
                />
            </View>
        </SafeAreaView>
    )
}