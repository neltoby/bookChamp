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
import ReadPost from './ReadPost'
import ViewArchive from './ViewArchive'
import SearchArchive from './SearchArchive'
import { MemoizedPlayQuizScreen } from './PlayQuizScreen'
import ReviewQuestion from './ReviewQuestion'
import Subject from './Subject'
import TransSummary from './TransSummary'
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
            <Drawer.Screen name="PlayQuiz" component={MemoizedPlayQuizScreen} />
            <Drawer.Screen name="Subject" component={Subject} />
            <Drawer.Screen name="ReadPost" component={ReadPost} />
            <Drawer.Screen name="TransSummary" component={TransSummary} />
            <Drawer.Screen name="SearchArchive" component={SearchArchive} />
            <Drawer.Screen name="ViewArchive" component={ViewArchive} />
            <Drawer.Screen name="ReviewQuestion" component={ReviewQuestion} />
        </Drawer.Navigator>
    )
}
ReadPost
export default Home