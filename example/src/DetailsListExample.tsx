import React, { useState, useEffect } from 'react'
import { DetailsList, DetailsListColumn } from 'fluentui-components'
import faker from 'faker'
import { useWindowSize } from './useWindowSize'
import styled from 'styled-components'
import ReactTooltip from 'react-tooltip'
import { createPortal } from 'react-dom'
import moment from 'moment'
import { useToasts } from 'react-toast-notifications'
import { Checkbox, Icon, Slider } from 'office-ui-fabric-react'

const getCols = (
  rows: any[],
  setRows: (rows: any[]) => void,
  addToast: any
) => {
  const cols: DetailsListColumn[] = [
    {
      key: 'profileImage',
      label: '',
      width: 50,
      align: 'center',
      render: ({ row }) => (
        <img style={{ width: '100%', height: '100%' }} src={row.profileImage} />
      )
    },
    {
      key: 'name',
      isSortable: true,
      label: 'Name',
      width: 100
    },
    {
      key: 'dob',
      isSortable: true,
      label: 'Date of Birth',
      width: 150,
      transform: ({ row }) => {
        return moment(row.dob).format('LL')
      },
      renderLabel: () => {
        return (
          <div style={{ display: 'flex', paddingLeft: 5 }}>
            <Icon iconName='Calendar' />
          </div>
        )
      },
      align: 'center'
    },
    {
      key: 'address',
      isSortable: true,
      label: 'Address',
      width: 200,
      truncateProps: ({ row }) => ({
        'data-for': 'tooltip',
        'data-tip': row.address
      })
    },
    {
      key: 'phoneNumber',
      isSortable: true,
      label: 'Phone',
      width: 200
    },
    {
      key: 'email',
      isSortable: true,
      label: 'Email',
      width: 200
    },
    {
      key: 'isEmployed',
      label: 'Is employed',
      width: 150,
      align: 'center',
      transform: ({ row }) => (
        <input
          type='checkbox'
          checked={row.isEmployed}
          onChange={(e) => {
            const isChecked = e.target.checked
            setRows(
              rows.map((r) => {
                if (r.id === row.id) {
                  return {
                    ...r,
                    isEmployed: isChecked
                  }
                }
                return r
              })
            )
          }}
        />
      )
    },
    {
      key: 'companyName',
      label: 'Company',
      width: 200,
      transform: ({ row }) => {
        if (row.isEmployed) {
          return row.companyName
        } else {
          return '❌'
        }
      }
    },
    {
      key: 'gender',
      label: 'Gender',
      width: 200,
      transform: ({ row }) => {
        return (
          <select
            value={row.gender}
            onChange={(e) => {
              setRows(
                rows.map((r) => {
                  if (r.id === row.id) {
                    return {
                      ...r,
                      gender: e.target.value
                    }
                  }
                  return r
                })
              )
            }}
          >
            <option value='male'>M</option>
            <option value='female'>F</option>
          </select>
        )
      }
    },
    {
      key: 'pet',
      isSortable: true,
      label: 'Pet',
      width: 70,
      align: 'center',
      transform: ({ row }) => {
        if (row.pet === 'cat') {
          return (
            <div data-for='tooltip' data-tip='Cat'>
              😺
            </div>
          )
        } else if (row.pet === 'dog') {
          return (
            <div data-for='tooltip' data-tip='Dog'>
              🐶
            </div>
          )
        } else {
          return (
            <div data-for='tooltip' data-tip='Lizard'>
              🦎
            </div>
          )
        }
      }
    },
    {
      key: 'options',
      label: '',
      width: 40,
      render: ({ row, rowIndex }) => {
        return (
          <CenteredCell>
            <button
              style={{ padding: '2px' }}
              onClick={() => {
                const rowsCopy = rows.slice(0)
                rowsCopy.splice(rowIndex, 1)
                setRows(rowsCopy)
                addToast(`Deleted ${row.name}`, {
                  appearance: 'error',
                  autoDismiss: true,
                  // @ts-ignore
                  autoDismissTimeout: 3000
                })
              }}
            >
              🗑️
            </button>
          </CenteredCell>
        )
      }
    },
    {
      key: 'filler',
      label: '',
      renderHeader: () => {
        return (
          <iframe
            width='100%'
            height='100%'
            src='https://www.youtube.com/embed/tgbNymZ7vqY'
          ></iframe>
        )
      },
      align: 'center',
      render: ({ row }) => {
        return (
          <CenteredCell>
            <img
              id={`image-${row.id}`}
              style={{
                width: 40,
                height: '100%',
                marginRight: 5
              }}
              src='https://picsum.photos/40/40'
              alt='something'
            />
            <button
              onClick={() => {
                const img = document.getElementById(
                  `image-${row.id}`
                ) as HTMLImageElement
                img.src = `https://picsum.photos/${getRandomInt(
                  30,
                  40
                )}/${getRandomInt(30, 40)}`
              }}
            >
              New image
            </button>
          </CenteredCell>
        )
      },
      width: 500
    }
  ]

  return cols
}

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const initRows = Array(1000)
  .fill(0)
  .map((_, idx) => {
    const isEmployed = faker.random.boolean()
    const gender = Math.random() > 0.5 ? 'male' : 'female'

    return {
      id: faker.random.uuid(),
      profileImage: `https://avatars.dicebear.com/api/${gender}/${idx}.svg`,
      name: faker.name.firstName(),
      address: faker.address.streetAddress() + ', ' + faker.address.city(),
      phoneNumber: faker.phone.phoneNumber(),
      email: faker.internet.email(),
      isEmployed,
      companyName: faker.company.companyName(),
      gender,
      pet: Math.random() > 0.7 ? 'dog' : Math.random() > 0.5 ? 'cat' : 'lizard',
      dob: faker.date.past(30)
    }
  })

export const DetailsListExample = () => {
  const { width: windowWidth } = useWindowSize()
  const [rows, setRows] = useState(initRows)
  const [sort, setSort] = useState({ key: 'name', dir: 'asc' })
  const [width, setWidth] = useState(windowWidth)
  const [fixedCols, setFixedCols] = useState(2)
  const { addToast } = useToasts()
  const [isLoading, setIsLoading] = useState(false)
  const [noData, setNoData] = useState(false)
  const [cols, setCols] = useState(getCols(rows, setRows, addToast))

  useEffect(() => {
    if (noData) {
      setRows([])
    } else {
      setRows(initRows)
    }
  }, [noData])

  useEffect(() => {
    if (isLoading) {
      setNoData(true)
    }
  }, [isLoading])

  useEffect(() => {
    setRows([
      ...rows.sort((a, b) => {
        if (a[sort.key] > b[sort.key]) {
          if (sort.dir === 'desc') return -1
          else return 1
        } else if (a[sort.key] < b[sort.key]) {
          if (sort.dir === 'desc') return 1
          else return -1
        } else {
          return 0
        }
      })
    ])
  }, [sort])

  useEffect(() => {
    setWidth(Math.min(width, windowWidth))
  }, [windowWidth, width])

  const headerHeight = 100

  return (
    <>
      <div style={{ height: headerHeight, paddingBottom: 20 }}>
        <h1>Details List</h1>
        <Controls>
          <Slider
            value={width}
            step={10}
            min={300}
            max={windowWidth}
            onChange={(value) => {
              setWidth(value)
            }}
            label={`Width`}
            styles={{
              root: {
                flexBasis: 200
              }
            }}
          />
          <Slider
            value={fixedCols}
            min={0}
            step={1}
            max={cols.length}
            onChange={(value) => {
              setFixedCols(value)
            }}
            label={`Fixed columns`}
            styles={{
              root: {
                flexBasis: 200
              }
            }}
          />
          <Checkbox
            checked={isLoading}
            onChange={() => setIsLoading(!isLoading)}
            label='Is loading'
            styles={{
              root: { marginRight: 10 }
            }}
          />
          <Checkbox
            checked={noData}
            onChange={() => setNoData(!noData)}
            label='No data'
          />
        </Controls>
      </div>
      <DetailsList
        id='myList'
        cols={cols}
        rows={rows}
        columnCount={cols.length}
        rowCount={rows.length}
        columnWidth={({ index }: any) => cols[index].width}
        fixedColumnCount={fixedCols}
        height={500}
        width={width}
        rowHeight={40}
        onSectionRendered={() => {
          ReactTooltip.rebuild()
        }}
        onClickCell={({ row }: any) => {
          addToast(`Clicked on ${row.name}`, {
            appearance: 'info',
            autoDismiss: true,
            // @ts-ignore
            autoDismissTimeout: 3000
          })
        }}
        sort={sort}
        onClickHeader={({ col }: any) => {
          if (!col.isSortable) return

          const isSorted = sort.key === col.key
          if (isSorted) {
            setSort({
              key: col.key,
              dir: sort.dir === 'asc' ? 'desc' : 'asc'
            })
          } else {
            setSort({
              key: col.key,
              dir: 'asc'
            })
          }
        }}
        isLoading={isLoading}
        noDataMessage='No data to show'
        onResizeCol={({ col, x }: any) => {
          setCols(
            cols.map((c) => {
              if (c.key === col.key) {
                return {
                  ...c,
                  width: c.width + x
                }
              }
              return c
            })
          )
        }}
      />
      {createPortal(
        <ReactTooltip id='tooltip' effect='solid' />,
        document.body
      )}
    </>
  )
}

const CenteredCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`

const Controls = styled.div`
  display: flex;
  align-items: center;
`
