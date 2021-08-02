import React, { useState } from "react"
import { SafeAreaView, FlatList } from "react-native"

import { useNavigation } from "@react-navigation/native"

import { OptionsModal } from "../../components/OptionsModal"
import { AddButton } from "../../components/AddButton"
import { Divider } from "../../components/Divider"
import { Header } from "../../components/Header"
import { Group } from "../../components/Group"

import { styles } from "./styles"

export function Groups(){
    const navigation = useNavigation()

    const [optionsVisible, setOptionsVisible] = useState(false)

    const [options, setOptions] = useState([
        {
            id: '1',
            title: 'Editar',
            function: () => {
                navigation.navigate('EditGroup')
                setOptionsVisible(false)
            }
        },
        {
            id: '2',
            title: 'Membros',
            function: () => {
                navigation.navigate('GroupMembers')
                setOptionsVisible(false)
            }
        },
        {
            id: '3',
            title: 'Copiar link',
            function: () => setOptionsVisible(false)
        },
        {
            id: '4',
            title: 'Sair',
            function: () => setOptionsVisible(false)
        },
        {
            id: '5',
            title: 'Cancelar',
            function: () => setOptionsVisible(false)
        }
    ])

    const [groups, setGroups] = useState([
        {
            id: '1',
            title: 'Familia',
            amountOfPeople: 4,
            image: 'https://memegenerator.net/img/instances/81104063.jpg'
        },
        {
            id: '2',
            title: 'Turma de inglês',
            amountOfPeople: 21,
            image: 'https://certificadocursosonline.com/wp-content/uploads/2017/09/curso-de-ingles-online-gratis-1280x720.jpg'
        },
        {
            id: '3',
            title: 'Só os bronzes',
            amountOfPeople: 8,
            image: 'https://assets2.rockpapershotgun.com/leage-of-legends-viego-reveal.jpg/BROK/resize/1920%3E/format/jpg/quality/80/leage-of-legends-viego-reveal.jpg',
        },
        {
            id: '4',
            title: 'Curso de música',
            amountOfPeople: 21,
            image: 'https://zenitemarcas.com.br/wp-content/uploads/2018/05/como-registrar-uma-m%C3%BAsica.jpg'
        },
        {
            id: '5',
            title: 'Equipe de programação',
            amountOfPeople: 21,
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp6eTZ4KkutOQA_jywU5GYF6l-3XAtrXXBKw&usqp=CAU'
        },
        {
            id: '6',
            title: 'Grupo de dança',
            amountOfPeople: 21,
            image: 'https://static.mundoeducacao.uol.com.br/mundoeducacao/conteudo_legenda/51b064ab86cca89289eb59d99f787efc.jpg'
        },
    ])

    return(
        <SafeAreaView style={styles.container}>
            <Header
                title='Grupos'
                action={<AddButton onPress={() => navigation.navigate('CreateGroup')} />}
            />

            <FlatList
                data={groups}
                keyExtractor={item => item.id}
                renderItem={({item}) => {
                    return(
                        <Group
                            data={item}
                            openOptions={() => {
                                setOptionsVisible(true)
                            }}
                            onPress={() => {
                                navigation.navigate('GroupNavigation')
                            }}
                        />
                    )
                }}
                ItemSeparatorComponent={Divider}
                showsVerticalScrollIndicator={false}
            />

            <OptionsModal
                visible={optionsVisible}
                closeModal={() => {
                    setOptionsVisible(false)
                }}
                data={options}
            />
        </SafeAreaView>
    )
}