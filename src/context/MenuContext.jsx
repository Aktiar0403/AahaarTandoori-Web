import React, { createContext, useState, useContext } from 'react'

const MenuContext = createContext()

export const useMenu = () => useContext(MenuContext)

export const MenuProvider = ({ children }) => {
  const [menu, setMenu] = useState([
    {
      id: '1',
      name: 'Biriyani & Rice',
      items: [
        {
          id: '1',
          name: 'Chicken Biryani',
          description: 'Fragrant basmati rice cooked with tender chicken and aromatic spices',
          price: 220,
          halfPrice: 120,
          image: 'https://images.unsplash.com/photo-1563379091339-03246963d96f?ixlib=rb-4.0.3&w=400',
          cookingTime: '25 min',
          spicyLevel: 2,
          isVeg: false,
          available: true
        },
        // ... include all other menu items from previous code
      ]
    },
    // ... include all other categories
  ])

  const updateItem = (categoryId, itemId, updatedFields) => {
    setMenu(prevMenu => 
      prevMenu.map(category => {
        if (category.id === categoryId) {
          return {
            ...category,
            items: category.items.map(item => 
              item.id === itemId ? { ...item, ...updatedFields } : item
            )
          }
        }
        return category
      })
    )
  }

  const value = {
    menu,
    updateItem
  }

  return (
    <MenuContext.Provider value={value}>
      {children}
    </MenuContext.Provider>
  )
}