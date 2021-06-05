import React from 'react'
import {Auth} from './Auth'
import renderer from 'react-test-renderer'

describe('Auth component', () => {
    it('matches the snapshot', () => {
        const tree = renderer.create(< Auth/>).toJson()
        expect(tree).toMatchSnapshot()
    })
})
