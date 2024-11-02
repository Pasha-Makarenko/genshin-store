"use client"

import {
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  FC,
  ReactNode,
} from "react"

export interface PaginationProps {
  items: number
  pageSize: number
  pagination: {
    page: number
    showMoreCount: number
  }
  setPagination: Dispatch<SetStateAction<PaginationProps["pagination"]>>
  renderButtonCountSides: number
  renderButtonCountActive: number
}

const Pagination: FC<PaginationProps> = props => {
  const pageCount = Math.ceil(props.items / props.pageSize)

  if (pageCount <= 1) {
    return null
  }

  const prevHandler: MouseEventHandler = _ => {
    if (props.pagination.page > 0) {
      props.setPagination({
        page: props.pagination.page - 1,
        showMoreCount: 0,
      })
    }
  }

  const nextHandler: MouseEventHandler = _ => {
    if (
      props.pagination.page + props.pagination.showMoreCount + 1 <
      pageCount
    ) {
      props.setPagination({
        page: props.pagination.page + props.pagination.showMoreCount + 1,
        showMoreCount: 0,
      })
    }
  }

  const pageChangeHandler = (itemPage: number) => {
    if (
      itemPage < props.pagination.page ||
      itemPage > props.pagination.page + props.pagination.showMoreCount
    ) {
      props.setPagination({
        page: itemPage,
        showMoreCount: 0,
      })
    }
  }

  const showMoreHandler: MouseEventHandler = _ => {
    if (
      props.pagination.page + props.pagination.showMoreCount + 1 <
      pageCount
    ) {
      props.setPagination({
        ...props.pagination,
        showMoreCount: props.pagination.showMoreCount + 1,
      })
    }
  }

  return (
    <div className="pagination">
      <button
        type="button"
        className="pagination__btn"
        onClick={showMoreHandler}
      >
        Show more
      </button>
      <div className="pagination__items">
        <button
          type="button"
          className={`pagination__item pagination__item_prev ${props.pagination.page > 0 ? "" : "pagination__item_disabled"}`.trim()}
          onClick={prevHandler}
        >
          {"<"}
        </button>
        {new Array(pageCount).fill(null).map((_, i) => {
          let node: ReactNode

          if (
            i < props.renderButtonCountSides ||
            i >= pageCount - props.renderButtonCountSides ||
            (i >= props.pagination.page - props.renderButtonCountActive &&
              i <
                props.pagination.page +
                  props.pagination.showMoreCount +
                  props.renderButtonCountActive +
                  1)
          ) {
            node = (
              <div
                key={i}
                className={`pagination__item ${props.pagination.page <= i && i <= props.pagination.page + props.pagination.showMoreCount ? "pagination__item_current" : ""}`.trim()}
                onClick={_ => pageChangeHandler(i)}
              >
                {i + 1}
              </div>
            )
          } else if (
            (i < props.renderButtonCountSides + 1 &&
              i < props.pagination.page - props.renderButtonCountActive) ||
            (i >= pageCount - props.renderButtonCountSides - 1 &&
              i >
                props.pagination.page +
                  props.pagination.showMoreCount +
                  props.renderButtonCountActive)
          ) {
            node = (
              <div key={i} className="pagination__item">
                ...
              </div>
            )
          }

          return node
        })}
        <button
          type="button"
          className={`pagination__item pagination__item_next ${props.pagination.page + 1 < pageCount ? "" : "pagination__item_disabled"}`.trim()}
          onClick={nextHandler}
        >
          {">"}
        </button>
      </div>
    </div>
  )
}

export default Pagination
