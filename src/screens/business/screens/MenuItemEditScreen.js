import React from 'react';
import { View, SafeAreaView, StyleSheet, ScrollView, ImageBackground, Modal } from 'react-native';
import { store } from 'app/src/redux/store';
import { Button, Card, Paragraph, TextInput, FAB, Title, Text } from 'react-native-paper';
import api from '../api';


export default class MenuItemEditScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: {
        items: []
      },
      editMode: false,
      modalVisible: false,
      modeTitle: '',
      newItem: {
        id:'',
        title: '',
        description: '',
        price: '',
        imageUrl: ''
      }

    }

  }

  componentWillMount() {
    this.setState({ menu: this.props.navigation.state.params });

  }

  showModal(editOption, item) {
    this.setState({ editMode: editOption })
    if (editOption) {
      this.setState({ modeTitle: 'Edit Item' })
      this.setState({newItem: item})
    }
    else {
      this.setState({ modeTitle: 'New Item' })
    }

    this.setState({ modalVisible: true });
  }

  onSavePress() {
    if (this.state.editMode) {
      api.updateMenuItem(this.state.newItem)
        .then((res) =>{
          for(let i = 0; i < this.state.menu.items.length; i++){
            if (this.state.menu.items[i].id === res.id) {
              this.state.menu.items[i] = res;
              this.setState({ menu: this.state.menu });
              break;
            }
          }
      })

    } else {
      let menuId = this.props.navigation.state.params.id;
      api.postMenuItem(this.state.newItem, menuId)
        .then((res) => {
          this.setState({ menu: res });
        })
    }

    this.clearNewItem();
  }

  deleteMenuItem(item) {
    api.deleteMenuItem(item.id)
    .then((res) => {
      console.log(res)
      for(let i = 0; i < this.state.menu.items.length-1; i++){
        if(this.state.menu.items.id === item.id){
          delete this.state.menu.items[i];
          this.setState({menu: this.state.menu});
        }

       
      }
    })
  }

  clearNewItem(){
    this.setState({newItem: {}})
    this.setState({ modalVisible: false })

  }

  render() {
    let hasItems = false
    if(this.state.menu.items != null) hasItems = this.state.menu.items.length >= 1;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.innerContainer}>


          <ScrollView style={styles.ScrollView}>
            <ImageBackground
              source={{ uri: this.state.menu.imageUrl }}
              style={styles.header}
            >
              <View style={styles.headerContainer}>
                <View>
                  <Title style={styles.headerText}>{this.state.menu.title}</Title>
                </View>
              </View>
            </ImageBackground>

            {hasItems ? (
              this.state.menu.items.map((item, i) => (
                <Card style={{ marginTop: 15, margin: 5 }} key={i + item.title}>
                  <Card.Content>
                    <Card.Cover source={{ uri: item.imageUrl }} />
                    <Title>{item.title}</Title>
                    <Paragraph>{item.description}</Paragraph>
                    <Paragraph>${item.price}</Paragraph>
                  </Card.Content>

                  <Card.Actions>
                    <Button 
                      onPress={this.showModal.bind(this, true, item)}
                      color={theme.primary}
                      >
                      Edit
                  </Button>
                    <Button 
                      onPress={this.deleteMenuItem.bind(this, item)}
                      color={theme.primary}
                      >
                      Delete
                  </Button>
                  </Card.Actions>
                </Card>

              ))

            ) : (
                <Text>No items</Text>
              )
            }



          </ScrollView>
          <FAB
            style={styles.fab}
            large
            color={'white'}
            icon='add'
            onPress={this.showModal.bind(this, false, null)}
          />

        </View>

        <Modal
          animationType="fade"
          style={styles.modal}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => this.clearNewItem()}
        >

          <View style={styles.modalOuter}>
            <View style={styles.modalInner}>
              <View style={styles.formContainer}>
								<Title style={{ marginBottom: 10 }}>{this.state.modeTitle}</Title>

                <TextInput
								  label='Title'
								  value={this.state.newItem.title}
								  onChangeText={(title) => this.setState({ newItem: { ...this.state.newItem, title: title } })}
								  style={styles.input}
								  mode={'flat'}
								  placeholder={'Title'}
							  />
                
                <TextInput
								  label='Description'
								  value={this.state.newItem.description}
								  onChangeText={(desc) => this.setState({ newItem: { ...this.state.newItem, description: desc } })}
								  style={styles.input}
                  mode={'flat'}
                  maxLength={140}
                  multiline={true}
								  placeholder={'Description'}
							  />

                <TextInput
								  label='Price'
								  value={this.state.newItem.price}
								  onChangeText={(price) => this.setState({ newItem: { ...this.state.newItem, price: price } })}
								  style={styles.input}
                  mode={'flat'}
                  keyboardType={'number-pad'}
								  placeholder={'0.00'}
							  />
                
                <TextInput
								  label='Image URL'
								  value={this.state.newItem.imageUrl}
								  onChangeText={(imageUrl) => this.setState({ newItem: { ...this.state.newItem, imageUrl: imageUrl } })}
								  style={styles.input}
                  mode={'flat'}
								  placeholder={'http://yourimage.jpg'}
							  />

              </View>
              
              <Button
                mode="contained"
                onPress={this.onSavePress.bind(this)}
                style={styles.saveButton}
              >
                Save
              </Button>

              <Button
                mode="contained"
                style={styles.saveButton}
              >
                Delete
              </Button>
            
            </View>
          </View>

        </Modal>

      </SafeAreaView>




    );
  }
}

const theme = store.getState().settings.theme;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: theme.primary,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    width: '100%'
  },
  ScrollView: {
    flex: 5,
    width: '100%'
  },
  header: {
    width: '100%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5
  },
  headerText: {
    color: 'white',
    fontSize: 32,
    textShadowOffset: {
      width: 0.5,
      height: 1
    },
    textShadowColor: '#000000',
    textShadowRadius: 5
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5
  },
	saveButton: {
		backgroundColor: theme.primary,
		alignItems: 'center',
		justifyContent: 'center',
		margin: 5,
		padding: 5,
		borderRadius: 2,
		width: '95%'
	},
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalInner: {
    justifyContent: 'center',
    backgroundColor: 'white',
    height: '95%',
    width: '95%',
    borderRadius: 5
  },
  modalOuter: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center'
  },
	input: {
		elevation: 2,
		backgroundColor: theme.background,
		elevation: 5,
		borderRadius: 5,
		width: '100%',
		margin: 5		
	}
});