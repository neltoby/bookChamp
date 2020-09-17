import React from 'react'
import {  Left, Text, Body, Right, List, ListItem, Thumbnail } from 'native-base';

const getData = (props) => props.data !== undefined ? props.data : []  
export default function LiveRanks(props) {
    return (
        <>
        {getData(props).length ? (
            <List>
                {data.map((item, i) => (
                    <ListItem avatar>
                        <Left>
                            <Thumbnail source={{ uri: item.img }} />
                        </Left>
                        <Body>
                            <Text>Kumar Pratik</Text>
                            {item.status ? 
                                <Text note numberOfLines={1}>{item.status}</Text>
                            :
                            ''
                            }                           
                        </Body>
                        <Right>
                            <Text note>{item.time}</Text>
                        </Right>
                    </ListItem>
                )) 
                }
            </List>
        ):
        (
            <>
                <Text>You do not have any ranking</Text>
            </>
        )
        }
        </>
    )
}
