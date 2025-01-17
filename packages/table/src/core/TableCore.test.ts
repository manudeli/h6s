import { TableCore } from '..'
import { paymentDataset, paymentDatasetWithSum } from '../mocks/payments.mock'
import { paymentsTableModel } from '../mocks/paymentsTableModel.mock'
import { sum } from '../utils/sum'

describe('let instance = new TableCore(model, { source })', () => {
  const instance = new TableCore(paymentsTableModel, {
    source: paymentDataset,
  })

  describe('instance.generate()', () => {
    const { theadGroups, rows, tfoots, headMeta } = instance.generate()

    describe('return theadGroups', () => {

      it('return theadGroups which have 3 length (3 is largest depth of generated table)', () => {
        expect(theadGroups.length).toBe(3)
      })

      test('check first HeaderGroup', () => {
        expect(theadGroups[0].theads.length).toBe(8)

        const [DATE, ID, SUB_ID, AMOUNT, BUYER, PAY_METHOD, TRANSACTION_ID, MESSAGE] = theadGroups[0].theads

        expect(DATE.label).toBe('Date')
        expect(DATE.rowSpan).toBe(3)
        expect(DATE.colSpan).toBe(1)

        expect(ID.label).toBe('Id')
        expect(ID.rowSpan).toBe(3)
        expect(ID.colSpan).toBe(1)

        expect(SUB_ID.label).toBe('Sub Id')
        expect(SUB_ID.rowSpan).toBe(3)
        expect(SUB_ID.colSpan).toBe(1)

        expect(AMOUNT.label).toBe('AMOUNT')
        expect(AMOUNT.rowSpan).toBe(1)
        expect(AMOUNT.colSpan).toBe(2)

        expect(BUYER.label).toBe('Buyer')
        expect(BUYER.rowSpan).toBe(3)
        expect(BUYER.colSpan).toBe(1)

        expect(PAY_METHOD.label).toBe('PAY METHOD')
        expect(PAY_METHOD.rowSpan).toBe(1)
        expect(PAY_METHOD.colSpan).toBe(3)

        expect(TRANSACTION_ID.label).toBe('Transaction Id')
        expect(TRANSACTION_ID.rowSpan).toBe(3)
        expect(TRANSACTION_ID.colSpan).toBe(1)

        expect(MESSAGE.label).toBe('Message')
        expect(MESSAGE.rowSpan).toBe(3)
        expect(MESSAGE.colSpan).toBe(1)
      })

      test('check second HeaderGroup', () => {
        expect(theadGroups[1].theads.length).toBe(4)

        const [PAID, CANCELED, CARD, TRANSFER] = theadGroups[1].theads

        expect(PAID.label).toBe('Paid')
        expect(PAID.rowSpan).toBe(2)
        expect(PAID.colSpan).toBe(1)

        expect(CANCELED.label).toBe('Canceled')
        expect(CANCELED.rowSpan).toBe(2)
        expect(CANCELED.colSpan).toBe(1)

        expect(CARD.label).toBe('CARD')
        expect(CARD.rowSpan).toBe(1)
        expect(CARD.colSpan).toBe(2)

        expect(TRANSFER.label).toBe('Transfer')
        expect(TRANSFER.rowSpan).toBe(2)
        expect(TRANSFER.colSpan).toBe(1)
      })

      test('check third HeaderGroup', () => {
        expect(theadGroups[2].theads.length).toBe(2)

        const [PLCC, DEBIT] = theadGroups[2].theads

        expect(PLCC.label).toBe('Plcc')
        expect(PLCC.rowSpan).toBe(1)
        expect(PLCC.colSpan).toBe(1)

        expect(DEBIT.label).toBe('Debit')
        expect(DEBIT.rowSpan).toBe(1)
        expect(DEBIT.colSpan).toBe(1)
      })
    })

    describe('return rows', () => {
      it('rows have 7 length', () => {
        expect(rows.length).toBe(7)
      })

      const [firstRow, secondRow, thirdRow, fourthRow, fifthRow] = rows

      test('first row have cells,', () => {
        expect(firstRow.cells.length).toBe(11)
        expect(firstRow.getRowProps().rowSpan).toBe(4)

        const [DATE, ID, SUB_ID, PAID, CANCELED, BUYER, PLCC, DEBIT, TRANSFER, TRANSACTION_ID, MESSAGE] = firstRow.cells

        expect(DATE.label).toBe('Date')
        expect(DATE.rowSpan).toBe(4)
        expect(DATE.colSpan).toBe(1)

        expect(ID.label).toBe('Id')
        expect(ID.rowSpan).toBe(3)
        expect(ID.colSpan).toBe(1)

        expect(SUB_ID.label).toBe('Sub Id')
        expect(SUB_ID.rowSpan).toBe(2)
        expect(SUB_ID.colSpan).toBe(1)

        ;[BUYER, PAID, CANCELED, PLCC, DEBIT, TRANSFER, TRANSACTION_ID].forEach(target => {
          expect(target.rowSpan).toBe(1)
          expect(target.colSpan).toBe(1)
        })

        expect(TRANSACTION_ID.label).toBe('Transaction Id')
        expect(MESSAGE.label).toBe('Message')
      })

      test('second row have cells,', () => {
        expect(secondRow.cells.length).toBe(8)
        expect(secondRow.getRowProps().rowSpan).toBe(4)

        expect(secondRow.cells[0].label).toBe('Paid')
        secondRow.cells.forEach(target => {
          expect(target.rowSpan).toBe(1)
          expect(target.colSpan).toBe(1)
        })
      })

      test('third row have cells,', () => {
        expect(thirdRow.cells.length).toBe(9)
        expect(thirdRow.getRowProps().rowSpan).toBe(4)

        expect(thirdRow.cells[0].label).toBe('Sub Id')
        thirdRow.cells.forEach(target => {
          expect(target.rowSpan).toBe(1)
          expect(target.colSpan).toBe(1)
        })
      })

      test('fourth row have cells,', () => {
        expect(fourthRow.cells.length).toBe(10)
        expect(fourthRow.getRowProps().rowSpan).toBe(4)

        expect(fourthRow.cells[0].label).toBe('Id')
        fourthRow.cells.forEach(target => {
          expect(target.rowSpan).toBe(1)
          expect(target.colSpan).toBe(1)
        })
      })

      test('fifth row have cells,', () => {
        expect(fifthRow.cells.length).toBe(11)
        expect(fifthRow.getRowProps().rowSpan).toBe(4)

        expect(fifthRow.cells[0].label).toBe('Date')

        const [DATE, ...restCells] = fifthRow.cells

        expect(DATE.label).toBe('Date')
        expect(DATE.rowSpan).toBe(2)
        expect(DATE.colSpan).toBe(1)

        restCells.forEach(target => {
          expect(target.rowSpan).toBe(1)
          expect(target.colSpan).toBe(1)
        })
      })
    })

    describe('return tfoots', () => {
      expect(tfoots!.length).toBe(8)

      const [TOTAL, PAID, CANCELED, EMPTY, PLCC, DEBIT, TRANSFER, REST] = tfoots!

      expect(TOTAL.colSpan).toBe(3)
      expect(PAID.colSpan).toBe(1)
      expect(CANCELED.colSpan).toBe(1)
      expect(EMPTY.colSpan).toBe(1)
      expect(PLCC.colSpan).toBe(1)
      expect(DEBIT.colSpan).toBe(1)
      expect(TRANSFER.colSpan).toBe(1)
      expect(REST.colSpan).toBe(2)
    })

    describe('return headMeta', () => {
      test('check headMeta', () => {
        expect(headMeta.date.label).toBe('Date')
        expect(headMeta.date.show).toBe(true)
        expect(headMeta.date.countOfChild).toBe(0)
        expect(headMeta.date.countOfParent).toBe(0)

        expect(headMeta.id.label).toBe('Id')
        expect(headMeta.id.show).toBe(true)
        expect(headMeta.id.countOfChild).toBe(0)
        expect(headMeta.id.countOfParent).toBe(0)

        expect(headMeta.subId.label).toBe('Sub Id')
        expect(headMeta.subId.show).toBe(true)
        expect(headMeta.subId.countOfChild).toBe(0)
        expect(headMeta.subId.countOfParent).toBe(0)

        expect(headMeta['amount+cancelAmount'].label).toBe('AMOUNT')
        expect(headMeta['amount+cancelAmount'].show).toBe(true)
        expect(headMeta['amount+cancelAmount'].countOfChild).toBe(1)
        expect(headMeta['amount+cancelAmount'].countOfParent).toBe(0)

        expect(headMeta.amount.label).toBe('Paid')
        expect(headMeta.amount.show).toBe(true)
        expect(headMeta.amount.countOfChild).toBe(0)
        expect(headMeta.amount.countOfParent).toBe(1)

        expect(headMeta.cancelAmount.label).toBe('Canceled')
        expect(headMeta.cancelAmount.show).toBe(true)
        expect(headMeta.cancelAmount.countOfChild).toBe(0)
        expect(headMeta.cancelAmount.countOfParent).toBe(1)

        expect(headMeta.buyer.label).toBe('Buyer')
        expect(headMeta.buyer.show).toBe(true)
        expect(headMeta.buyer.countOfChild).toBe(0)
        expect(headMeta.buyer.countOfParent).toBe(0)

        expect(headMeta['plcc+debit+transfer'].label).toBe('PAY METHOD')
        expect(headMeta['plcc+debit+transfer'].show).toBe(true)
        expect(headMeta['plcc+debit+transfer'].countOfChild).toBe(2)
        expect(headMeta['plcc+debit+transfer'].countOfParent).toBe(0)

        expect(headMeta['plcc+debit'].label).toBe('CARD')
        expect(headMeta['plcc+debit'].show).toBe(true)
        expect(headMeta['plcc+debit'].countOfChild).toBe(1)
        expect(headMeta['plcc+debit'].countOfParent).toBe(1)

        expect(headMeta['plcc'].label).toBe('Plcc')
        expect(headMeta['plcc'].show).toBe(true)
        expect(headMeta['plcc'].countOfChild).toBe(0)
        expect(headMeta['plcc'].countOfParent).toBe(2)

        expect(headMeta['debit'].label).toBe('Debit')
        expect(headMeta['debit'].show).toBe(true)
        expect(headMeta['debit'].countOfChild).toBe(0)
        expect(headMeta['debit'].countOfParent).toBe(2)

        expect(headMeta['transfer'].label).toBe('Transfer')
        expect(headMeta['transfer'].show).toBe(true)
        expect(headMeta['transfer'].countOfChild).toBe(0)
        expect(headMeta['transfer'].countOfParent).toBe(1)

        expect(headMeta['meta.transactionId'].label).toBe('Transaction Id')
        expect(headMeta['meta.transactionId'].show).toBe(true)
        expect(headMeta['meta.transactionId'].countOfChild).toBe(0)
        expect(headMeta['meta.transactionId'].countOfParent).toBe(0)

        expect(headMeta['message'].label).toBe('Message')
        expect(headMeta['message'].show).toBe(true)
        expect(headMeta['message'].countOfChild).toBe(0)
        expect(headMeta['message'].countOfParent).toBe(0)
      })
    })
  })

  describe('instance.updateHeads([\'date\']).generate()', () => {
    const { theadGroups, visibleHeadIds, tfoots } = instance.updateHead(['date']).generate()

    it('return single column instance with only \'date\' header', () => {
      expect(visibleHeadIds).toEqual(['date'])
      expect(theadGroups.length).toBe(1)
      expect(theadGroups[0].getRowProps().rowSpan).toBe(1)
      expect(theadGroups[0].theads.length).toBe(1)

      const [DATE] = theadGroups[0].theads

      expect(DATE.label).toBe('Date')
      expect(DATE.rowSpan).toBe(1)
      expect(DATE.colSpan).toBe(1)
    })

    it('return single footer', () => {
      expect(tfoots?.length).toBe(1)
      expect(tfoots?.[0].rowSpan).toBe(1)
    })
  })

  describe('instance.updateHeads([\'id\', \'buyer\'\'transfer\']).generate()', () => {
    const { theadGroups, visibleHeadIds, tfoots } = instance.updateHead(['id', 'buyer', 'transfer']).generate()

    it('return 2 depth column', () => {
      expect(visibleHeadIds).toEqual(['id', 'buyer', 'transfer'])
      expect(theadGroups.length).toBe(2)

      const [firstGroup, secondHeader] = theadGroups

      expect(firstGroup.getRowProps().rowSpan).toBe(2)
      expect(firstGroup.theads.length).toBe(3)
      expect(secondHeader.theads.length).toBe(1)

      const [ID, BUYER, PAY_METHOD] = firstGroup.theads

      expect(ID.label).toBe('Id')
      expect(ID.rowSpan).toBe(2)
      expect(ID.colSpan).toBe(1)

      expect(BUYER.label).toBe('Buyer')
      expect(BUYER.rowSpan).toBe(2)
      expect(BUYER.colSpan).toBe(1)

      expect(PAY_METHOD.label).toBe('PAY METHOD')
      expect(PAY_METHOD.rowSpan).toBe(1)
      expect(PAY_METHOD.colSpan).toBe(1)

      const [TRANSFER] = secondHeader.theads

      expect(TRANSFER.label).toBe('Transfer')
      expect(TRANSFER.rowSpan).toBe(1)
      expect(TRANSFER.colSpan).toBe(1)
    })

    it('return 2 length tfoots', () => {
      expect(tfoots?.length).toBe(2)

      const [first, second] = tfoots ?? []

      expect(first.accessor).toBeNull()
      expect(first.colSpan).toBe(2)
      expect(first.rowSpan).toBe(1)

      expect(second.accessor).toBe('transfer')
      expect(second.colSpan).toBe(1)
      expect(second.rowSpan).toBe(1)
    })
  })

  describe('instance.updateSource(filtered)', () => {
    const filtered = paymentDataset.filter(x => x.buyer === 'Jbee')
    const { rows } = instance.updateSource(filtered).generate()

    it('return one row', () => {
      expect(rows.length).toBe(1)
    })
  })

  describe('instance.updateSource() // Flush source', () => {
    const { rows } = instance.updateSource().generate()

    it('return empty row', () => {
      expect(rows.length).toBe(0)
    })
  })
})

describe('let instance = new TableCore(model, { defaultHeadIds }) // with default Headers', () => {
  describe('defaultHeadIds: [\'date\']', () => {
    const instance = new TableCore(paymentsTableModel, {
      defaultHeadIds: ['date'],
    })
    const { theadGroups, tfoots } = instance.generate()

    it('have single column with only \'date\' header', () => {

      expect(theadGroups.length).toBe(1)
      expect(theadGroups[0].getRowProps().rowSpan).toBe(1)
      expect(theadGroups[0].theads.length).toBe(1)

      const [DATE] = theadGroups[0].theads

      expect(DATE.label).toBe('Date')
      expect(DATE.rowSpan).toBe(1)
      expect(DATE.colSpan).toBe(1)
    })

    it('return single footer', () => {
      expect(tfoots!.length).toBe(1)
      expect(tfoots![0].rowSpan).toBe(1)
    })
  })

  describe('defaultHeadIds: [\'id\', \'transfer\']', () => {
    const instance = new TableCore(paymentsTableModel, {
      defaultHeadIds: ['id', 'transfer'],
    })
    const { theadGroups } = instance.generate()

    test('changed largest depth by headIds: 3 -> 2', () => {
      expect(theadGroups.length).toBe(2)

      const [firstGroup, secondHeader] = theadGroups

      expect(firstGroup.getRowProps().rowSpan).toBe(2)
      expect(firstGroup.theads.length).toBe(2)
      expect(secondHeader.theads.length).toBe(1)

      const [ID, PAY_METHOD] = firstGroup.theads

      expect(ID.label).toBe('Id')
      expect(ID.rowSpan).toBe(2)
      expect(ID.colSpan).toBe(1)

      expect(PAY_METHOD.label).toBe('PAY METHOD')
      expect(PAY_METHOD.rowSpan).toBe(1)
      expect(PAY_METHOD.colSpan).toBe(1)

      const [TRANSFER] = secondHeader.theads

      expect(TRANSFER.label).toBe('Transfer')
      expect(TRANSFER.rowSpan).toBe(1)
      expect(TRANSFER.colSpan).toBe(1)
    })
  })
})

describe('let instance = new TableCore(model) // without source', () => {
  const instance = new TableCore(paymentsTableModel, {})

  describe('instance.generate()', () => {
    const { rows } = instance.generate()

    it('return empty row', () => {
      expect(rows.length).toBe(0)
    })
  })

  describe('instance.composeRows().generate()', () => {
    const { rows } = instance.composeRows({
      groupBy: 'date',
      compose: rows => {
        return rows.concat([])
      },
    }).generate()

    it('return empty row', () => {
      expect(rows.length).toBe(0)
    })
  })
})

describe('let instance = new TableCore(model, { source: composeRow(data) })', () => {
  const instance = new TableCore(paymentsTableModel, {
    source: paymentDatasetWithSum,
  })

  describe('instance.generate()', () => {
    const { rows } = instance.generate()

    describe('return rows', () => {
      const [, , , , , , seventhRow] = rows

      test('check seventhRow', () => {
        const [TOTAL, SUB_ID] = seventhRow.cells

        expect(TOTAL.label).toBe('Id')
        expect(TOTAL.colSpan).toBe(2)
        expect(SUB_ID.label).toBe('Sub Id')
        expect(SUB_ID.colSpan).toBe(0)
      })
    })
  })
})

describe('let instance = new TableCore(model, { source }).compose(...)', () => {
  const instance = new TableCore(paymentsTableModel, {
    source: paymentDataset,
  })

  describe('instance.generate()', () => {
    const { rows } = instance.composeRows({
      groupBy: 'date',
      compose: rows => {
        const appended = TableCore.compose(rows, {
          groupBy: 'id',
          compose: rows => {
            return rows.concat({
              subId: '#SUB_TOTAL',
              amount: sum(rows.map(x => x.amount)),
              cancelAmount: sum(rows.map(x => x.cancelAmount)),
              buyer: 'N/A',
              plcc: sum(rows.map(x => x.plcc)),
              debit: sum(rows.map(x => x.debit)),
              transfer: sum(rows.map(x => x.transfer)),
              meta: {
                transactionId: 'N/A',
              },
              message: 'N/A',
            })
          },
        })

        return appended.concat({
          id: '#TOTAL',
          subId: '',
          amount: sum(rows.map(x => x.amount)),
          cancelAmount: sum(rows.map(x => x.cancelAmount)),
          buyer: 'N/A',
          plcc: sum(rows.map(x => x.plcc)),
          debit: sum(rows.map(x => x.debit)),
          transfer: sum(rows.map(x => x.transfer)),
          meta: {
            transactionId: 'N/A',
          },
          message: 'N/A',
        })
      },
    }).generate()

    describe('return rows', () => {
      const [, , , , , , seventhRow] = rows

      test('check seventhRow', () => {
        const [TOTAL, SUB_ID] = seventhRow.cells

        expect(TOTAL.label).toBe('Id')
        expect(TOTAL.colSpan).toBe(2)
        expect(SUB_ID.label).toBe('Sub Id')
        expect(SUB_ID.colSpan).toBe(0)
      })
    })
  })
})
