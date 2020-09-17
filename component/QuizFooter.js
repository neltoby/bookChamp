import React, { useMemo } from 'react'
import { Footer, FooterTab, Button, Text as NativeText } from 'native-base'
import { useSelector, useDispatch } from 'react-redux'
import isJson from '../processes/isJson'
import { next, skip } from '../actions/quiz'

export default function QuizFooter() {
    const store = isJson(useSelector(state => state))
    const dispatch = useDispatch()
    const displayed = store.quiz.displayed.length
    let allQuestion = useMemo(() => isJson(store.quiz.question), [])

    const skipQuestion = (id) => {
        dispatch(skip())
        dispatch(next())
    }

    return (
        <Footer>
            <FooterTab>
                <Button>
                    
                </Button>
                <Button>
                    
                </Button>
                <Button active>
                    
                </Button>

                {displayed == allQuestion.length || store.quiz.skipped.length == 5 ? 
                    <Button>
                        
                    </Button> 
                :
                    <Button onPress={() => skipQuestion(question.id)}>
                        <NativeText style={{color: '#fff', fontWeight: 'bold'}}>Skip</NativeText>
                    </Button>
                }
            </FooterTab>
        </Footer>
    )
}
