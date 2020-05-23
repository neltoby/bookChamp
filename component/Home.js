import React from 'react'
import logo from '../processes/image'
import {View, Text} from 'react-native'
import CustomSideBar from './CustomSideBar'
import SelectHome from './SelectHome'
import Subscribe from './Subscribe'
import NotificationScreen from './NotificationScreen'
import FaqScreen from './FaqScreen'
import SettingScreen from './SettingScreen'
import LearnScreen from './LearnScreen'
import QuizScreen from './QuizScreen'
import ArchiveScreen from './ArchiveScreen'
import RankingScreen from './RankingScreen'
import PlayQuizScreen from './PlayQuizScreen'
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

const Home = () => {
    return (
        <Drawer.Navigator hideStatusBar 
        initialRouteName="SelectHome" 
        backBehavior='initialRoute'
        drawerContent={(props) => <CustomSideBar {...props}/> }>
            <Drawer.Screen name="SelectHome" component={SelectHome} />
            <Drawer.Screen name="Notifications" component={NotificationScreen} />
            <Drawer.Screen name="Faq" component={FaqScreen} />
            <Drawer.Screen name="Quiz" component={QuizScreen} />
            <Drawer.Screen name="Subscribe" component={Subscribe} />
            <Drawer.Screen name="Learn" component={LearnScreen} />
            <Drawer.Screen name="Setting" component={SettingScreen} />
            <Drawer.Screen name="Archive" component={ArchiveScreen} />
            <Drawer.Screen name="Ranking" component={RankingScreen} />
            <Drawer.Screen name="PlayQuiz" component={PlayQuizScreen} />
        </Drawer.Navigator>
    )
}
export default Home