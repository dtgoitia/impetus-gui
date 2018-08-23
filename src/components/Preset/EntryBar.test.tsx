import each from 'jest-each';
import * as React from 'react';
import { create, ReactTestRenderer, ReactTestRendererJSON } from 'react-test-renderer';
import { EntryBar } from './EntryBar';
import { EntryType } from './EntryType';

describe('EntryBar', () => {

  /**
   * Parametrized tests enabled when react-scripts-ts upgrade their
   * Jest dependency to >=23.0.0
   *
   * Here docs:
   * https://jestjs.io/docs/en/api.html#testeachtable-name-fn
   *
   * TODO: Once upgraded, remove the packages:
   *  - jest-each
   *  - @types/jest-each
   */
  each([
    ['Black', EntryType.Loop],
    ['LawnGreen', EntryType.Rest],
    ['Red', EntryType.Work],
    ['Black', 'nonexistentType'],
  ]).test('should be %p when the entry type is %p)', (expectedColour, entryType) => {
    const component: ReactTestRenderer = create(
      <EntryBar entryType={entryType} />
    );
    expect(component).not.toBeNull();
    const tree: null | ReactTestRendererJSON = component.toJSON();
    if (!tree) { return; }
    expect(tree.props.style.backgroundColor).toBe(expectedColour);
  });

});
