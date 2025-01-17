import { HeadMeta, RendererModel } from '../../types/table'
import { getHeaderAccessorId } from './getHeaderAccessorId'

export function buildRendererModel<Row>(
  rendererModel: RendererModel<Row>,
  headMeta: HeadMeta,
): RendererModel<Row> {
  const result = []

  for (const model of rendererModel) {
    const id = Array.isArray(model.accessor) ? getHeaderAccessorId(model) : model.accessor

    if (headMeta[id].show) {
      const value = Array.isArray(model.accessor)
        ? { ...model, accessor: buildRendererModel(model.accessor, headMeta) }
        : model

      result.push(value)
    }
  }

  return result
}
